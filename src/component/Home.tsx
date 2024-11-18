import React from "react";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import { Logout } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            position: "relative",
            pt: 8
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSignOut}
            startIcon={<Logout />}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            Sign Out
          </Button>
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: "bold",
                color: "primary.main" 
              }}
            >
              Welcome to the Application
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              You've successfully logged in to your account
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
