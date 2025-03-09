'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonIcon from '@mui/icons-material/Person';
import theme from '../theme/theme';
import { logout, selectAuth, selectUser } from '../store/authSlice';
import { AppDispatch } from '../store/store';
import { userApi } from '../apis/userApi';
import { User } from '../apis/user';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector(selectAuth);
  const currentUser = useSelector(selectUser);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Check authentication status
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Handle logout
  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/login');
  };

  // Fetch user data
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const users = await userApi.getAllUsers();
      if (users && users.length > 0) {
        setUserData(users[0]);
        setSuccess('User data fetched successfully!');
      } else {
        setError('No users found');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              User Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleLogout} edge="end">
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* User Profile Card */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <PersonIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                  <Typography variant="h5">User Profile</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {currentUser ? (
                  <Box>
                    <Typography variant="body1"><strong>Name:</strong> {currentUser.name}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {currentUser.email}</Typography>
                    <Typography variant="body1">
                      <strong>Created:</strong> {new Date(currentUser.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                ) : (
                  <Typography color="text.secondary">No user data available</Typography>
                )}
              </Paper>
            </Grid>
            
            {/* Data Fetching Card */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <RefreshIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                  <Typography variant="h5">Fetch User Data</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" paragraph>
                    Click the button below to fetch the latest user data from the server.
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshIcon />}
                    onClick={fetchUserData}
                    disabled={loading}
                    fullWidth={isMobile}
                    sx={{ mb: 2 }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Fetch User Data'}
                  </Button>
                </Box>
                
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                  </Alert>
                )}
                
                {userData && (
                  <Card variant="outlined" sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Fetched Data:</Typography>
                      <Typography variant="body2"><strong>ID:</strong> {userData.id}</Typography>
                      <Typography variant="body2"><strong>Name:</strong> {userData.name}</Typography>
                      <Typography variant="body2"><strong>Email:</strong> {userData.email}</Typography>
                    </CardContent>
                  </Card>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
