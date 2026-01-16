import {
    Alert, Box, Button, CircularProgress, Container, Paper,
    TextField, Typography
} from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: 'admin@example.com',
    password: 'password123'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await authAPI.login(formData.email, formData.password);
      } else {
        response = await authAPI.register(formData.name, formData.email, formData.password);
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3, color: '#1a237e', fontWeight: 'bold' }}>
            Lead Management
          </Typography>
          
          <Alert severity="info" sx={{ width: '100%', mb: 3 }}>
            Demo Credentials: admin@example.com / password123
          </Alert>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                backgroundColor: '#1a237e',
                '&:hover': {
                  backgroundColor: '#3949ab'
                },
                height: '48px',
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'none'
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : (isLogin ? 'SIGN IN' : 'SIGN UP')}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => setIsLogin(!isLogin)}
              sx={{ 
                color: '#1a237e',
                textTransform: 'none',
                fontSize: '14px'
              }}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;