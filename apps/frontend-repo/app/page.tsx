"use client";

import React, { useEffect, useState, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  TextField,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import {
  logout,
  selectAuth,
  fetchUserProfile,
  updateUserProfile,
  selectUser,
  selectAuthLoading,
  selectAuthError,
  selectFetchSuccess,
  selectUpdateLoading,
  selectUpdateError,
  selectUpdateSuccess,
} from "../store/authSlice";
import { AppDispatch } from "../store/store";
import { User } from "../apis/user";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const isMobile = useMediaQuery("(max-width:600px)");

  // Local state for UI feedback
  const [error, setError] = useState<string | null>(null);
  // Get fetch success from Redux
  const fetchSuccess = useSelector(selectFetchSuccess);

  // State for user update form
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Update form with fetched user data when edit icon is clicked
  const handleEditClick = (user: User) => {
    setUpdateFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
    });
    setShowUpdateForm(true);
  };
  // Get update states from Redux
  const updateLoading = useSelector(selectUpdateLoading);
  const updateError = useSelector(selectUpdateError);
  const updateSuccess = useSelector(selectUpdateSuccess);

  // Check authentication status
  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Handle Redux auth error
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // Handle success message timeouts
  useEffect(() => {
    if (updateSuccess) {
      const timer = setTimeout(() => {
        dispatch({ type: "auth/clearUpdateSuccess" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [updateSuccess, dispatch]);

  useEffect(() => {
    if (fetchSuccess) {
      const timer = setTimeout(() => {
        dispatch({ type: "auth/clearFetchSuccess" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [fetchSuccess, dispatch]);

  // Handle logout
  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/login");
  };

  // Handle input change for update form
  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: value,
    });
  };

  // Handle update user submission
  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !updateFormData.name &&
      !updateFormData.email &&
      !updateFormData.password
    ) {
      dispatch({
        type: "auth/updateUserProfile/rejected",
        payload: "Please fill at least one field to update",
      });
      return;
    }

    // Check if user exists and has an ID
    if (!user || !user.id) {
      dispatch({
        type: "auth/updateUserProfile/rejected",
        payload: "User information is missing. Please fetch user data first.",
      });
      return;
    }

    // Only include fields that have values
    const dataToUpdate = Object.entries(updateFormData)
      .filter(([, value]) => value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    try {
      // Now we know user.id is not undefined - use the Redux action
      await dispatch(
        updateUserProfile({
          userId: user.id,
          data: dataToUpdate,
        })
      );

      // Clear password field after successful update
      setUpdateFormData((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (err) {
      // Error handling is done in the Redux action
      console.error("Failed to update user", err);
    }
  };

  // Fetch user data using Redux
  const fetchUserData = useCallback(async () => {
    setError(null);

    try {
      // Dispatch the Redux action to fetch user profile
      const resultAction = await dispatch(fetchUserProfile());

      if (fetchUserProfile.rejected.match(resultAction)) {
        // If the action was rejected, set error message
        setError(
          (resultAction.payload as string) || "Failed to fetch user data"
        );
      }
      // Success is handled by Redux state
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch user data";
      setError(errorMessage);
    }
  }, [dispatch]); // Only depends on dispatch which is stable

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <Box
      sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            edge="end"
            aria-label="Logout"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Data Fetching Card */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
              <Box display="flex" alignItems="center" mb={2}>
                <RefreshIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h5">Fetch User Data</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" paragraph>
                  Click the button below to fetch the latest user data from the
                  server.
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={fetchUserData}
                  disabled={authLoading}
                  fullWidth={isMobile}
                  sx={{ mb: 2 }}
                >
                  {authLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Fetch User Data"
                  )}
                </Button>
              </Box>

              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              {fetchSuccess && (
                <Typography color="success.main" sx={{ mb: 2 }}>
                  {fetchSuccess}
                </Typography>
              )}

              {/* Display user profile from Redux */}
              {user && (
                <Card variant="outlined" sx={{ mt: 2 }}>
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography variant="h6">User Profile:</Typography>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          if (user) handleEditClick(user);
                        }}
                        size="small"
                        aria-label="Edit user"
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2">
                      <strong>Name:</strong> {user?.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Email:</strong> {user?.email}
                    </Typography>
                    {user?.role && (
                      <Typography variant="body2">
                        <strong>Role:</strong> {user?.role}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              )}
            </Paper>
          </Grid>

          {/* User Update Card - Only shown when edit icon is clicked */}
          {showUpdateForm && (
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Box display="flex" alignItems="center">
                    <EditIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h5">Update User</Typography>
                  </Box>
                  <IconButton
                    onClick={() => setShowUpdateForm(false)}
                    color="default"
                    size="small"
                    aria-label="Close form"
                  >
                    <Typography variant="body2">×</Typography>
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {updateSuccess && (
                  <Typography color="success.main" sx={{ my: 2 }}>
                    {updateSuccess}
                  </Typography>
                )}

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Update your user information using the form below.
                </Typography>

                <form onSubmit={handleUpdateUser}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={updateFormData.name}
                        onChange={handleUpdateInputChange}
                        margin="normal"
                        helperText="Example: Test User 123"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={updateFormData.email}
                        onChange={handleUpdateInputChange}
                        margin="normal"
                        helperText="Example: test@123.com"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={updateFormData.password}
                        onChange={handleUpdateInputChange}
                        margin="normal"
                        helperText="Example: password123"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={updateLoading}
                        sx={{ mt: 2 }}
                      >
                        {updateLoading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Update User"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </form>

                {updateError && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {updateError}
                  </Typography>
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
