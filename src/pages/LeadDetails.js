import {
    ArrowBack as ArrowBackIcon,
    Business as BusinessIcon,
    CalendarToday as CalendarIcon,
    Email as EmailIcon,
    Notes as NotesIcon,
    Person as PersonIcon,
    Phone as PhoneIcon,
    Source as SourceIcon,
    Work as WorkIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { leadsAPI } from '../services/api';
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLeadDetails = useCallback(async () => {
    try {
      const response = await leadsAPI.getLeadById(id);
      setLead(response.data);
    } catch (error) {
      toast.error('Failed to fetch lead details');
      navigate('/leads');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchLeadDetails();
  }, [fetchLeadDetails]);

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (!lead) return null;

  const details = [
    { icon: <EmailIcon />, label: 'Email', value: lead.email },
    { icon: <PhoneIcon />, label: 'Phone', value: lead.phone },
    { icon: <BusinessIcon />, label: 'Company', value: lead.company },
    { icon: <WorkIcon />, label: 'Job Title', value: lead.jobTitle },
    { icon: <SourceIcon />, label: 'Source', value: lead.source },
    { icon: <PersonIcon />, label: 'Assigned To', value: lead.assignedTo },
    { icon: <CalendarIcon />, label: 'Last Contacted', value: lead.lastContacted ? formatDate(lead.lastContacted) : 'Never' },
    { icon: <CalendarIcon />, label: 'Created', value: formatDate(lead.createdAt) },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/leads')}
          sx={{ color: '#1a237e', mb: 2 }}
        >
          Back to Leads
        </Button>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ color: '#1a237e' }}>
              {lead.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Chip
                label={lead.status}
                size="medium"
                sx={{
                  backgroundColor: getStatusColor(lead.status) + '20',
                  color: getStatusColor(lead.status),
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}
              />
              <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                {formatCurrency(lead.value)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#1a237e' }}>
              Lead Information
            </Typography>
            
            <Grid container spacing={2}>
              {details.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ color: '#1a237e' }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        {item.label}
                      </Typography>
                      <Typography variant="body1">
                        {item.value || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {lead.notes && (
              <>
                <Divider sx={{ my: 3 }} />
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: '#1a237e' }}>
                    <NotesIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Notes
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#fafafa' }}>
                    <Typography variant="body1">
                      {lead.notes}
                    </Typography>
                  </Paper>
                </Box>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1a237e' }}>
              Lead Status Timeline
            </Typography>
            <List>
              {['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed-Won', 'Closed-Lost'].map((status, index) => (
                <ListItem key={status} sx={{ 
                  pl: 0,
                  borderLeft: lead.status === status ? '4px solid #1a237e' : 'none',
                  backgroundColor: lead.status === status ? '#f5f5f5' : 'transparent'
                }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: lead.status === status ? '#1a237e' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: lead.status === status ? 'white' : 'transparent'
                      }}
                    >
                      ✓
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary={status}
                    primaryTypographyProps={{
                      fontWeight: lead.status === status ? 'bold' : 'normal',
                      color: lead.status === status ? '#1a237e' : 'text.primary'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1a237e' }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="contained" sx={{ backgroundColor: '#1a237e' }}>
                Send Email
              </Button>
              <Button variant="outlined">
                Schedule Call
              </Button>
              <Button variant="outlined">
                Update Status
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default LeadDetails;