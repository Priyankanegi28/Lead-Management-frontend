import {
    AttachMoney as AttachMoneyIcon,
    CheckCircle as CheckCircleIcon,
    People as PeopleIcon,
    TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart, ResponsiveContainer, Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import Layout from '../components/Layout';
import { leadsAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await leadsAPI.getAnalytics();
      console.log('Analytics response:', response.data);
      
      if (response.data && response.data.data) {
        setAnalytics(response.data.data);
      } else if (response.data) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error('Analytics fetch error:', error);
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Leads',
      value: analytics?.totalLeads || 0,
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
      color: '#e8eaf6',
      description: 'Total number of leads'
    },
    {
      title: 'Converted Leads',
      value: analytics?.convertedLeads || 0,
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
      color: '#e8f5e9',
      description: 'Won deals'
    },
    {
      title: 'Conversion Rate',
      value: analytics ? 
        (analytics.conversionRate ? 
          `${analytics.conversionRate}%` : 
          analytics.totalLeads > 0 ? 
            `${((analytics.convertedLeads / analytics.totalLeads) * 100).toFixed(1)}%` : 
            '0%'
        ) : '0%',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
      color: '#fff3e0',
      description: 'Success rate'
    },
    {
      title: 'Total Value',
      value: formatCurrency(analytics?.totalValue || 0),
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
      color: '#e8f5e9',
      description: 'Pipeline value'
    }
  ];

  const stageData = analytics?.leadsByStage?.map(item => ({
    name: item._id,
    value: item.count
  })) || [
    { name: 'New', value: 100 },
    { name: 'Contacted', value: 80 },
    { name: 'Qualified', value: 60 },
    { name: 'Proposal', value: 40 },
    { name: 'Negotiation', value: 25 },
    { name: 'Closed-Won', value: 20 },
    { name: 'Closed-Lost', value: 15 }
  ];

  const sourceData = analytics?.leadsBySource?.map(item => ({
    name: item._id,
    value: item.count
  })) || [
    { name: 'Website', value: 100 },
    { name: 'Referral', value: 90 },
    { name: 'Social Media', value: 85 },
    { name: 'Advertisement', value: 75 },
    { name: 'Other', value: 50 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h4" sx={{ mb: 4, color: '#1a237e', fontWeight: 600 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              backgroundColor: stat.color,
              height: '100%',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {stat.description}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: -1 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CHART SECTION - Equal width charts */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Leads by Stage - md={6} for equal width */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <Typography variant="h5" sx={{ mb: 3, color: '#1a237e', fontWeight: 600 }}>
              Leads by Status
            </Typography>
            <Box sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stageData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'Number of Leads', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: -10,
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} leads`, 'Count']}
                    labelFormatter={(label) => `Stage: ${label}`}
                    contentStyle={{ 
                      borderRadius: 8,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    wrapperStyle={{ paddingTop: 10 }}
                  />
                  <Bar 
                    dataKey="value" 
                    name="Number of Leads" 
                    fill="#1a237e" 
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            {/* Additional stats for stage data */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Stage Breakdown:
              </Typography>
              <Grid container spacing={1}>
                {stageData.map((stage, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: '#1a237e',
                          opacity: 0.7,
                          mr: 1
                        }}
                      />
                      <Typography variant="body2">
                        {stage.name}: {stage.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Leads by Source - md={6} for equal width */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <Typography variant="h5" sx={{ mb: 3, color: '#1a237e', fontWeight: 600 }}>
              Leads by Source
            </Typography>
            <Box sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    innerRadius={30}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} leads`, 'Count']}
                    contentStyle={{ 
                      borderRadius: 8,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                      paddingLeft: 20,
                      lineHeight: '24px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            {/* Additional stats for source data */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Source Breakdown:
              </Typography>
              <Grid container spacing={1}>
                {sourceData.map((source, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: COLORS[index % COLORS.length],
                          mr: 1
                        }}
                      />
                      <Typography variant="body2">
                        {source.name}: {source.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;