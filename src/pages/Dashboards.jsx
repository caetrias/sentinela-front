import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export const Dashboards = () => {
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: '3.5rem', fontWeight: 700, mb: 2, color: 'white' }}>
            Dashboards
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Página em construção
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};