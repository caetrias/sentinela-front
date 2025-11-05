import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';

const GradientBox = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #22c55e 0%, #059669 50%, #0d9488 100%)',
});

const StyledButton = styled(Button)({
  padding: '16px 40px',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  color: 'white',
  fontSize: '1.125rem',
  borderRadius: '8px',
  textTransform: 'none',
  backdropFilter: 'blur(4px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    transform: 'translateY(-2px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
});

export const Home = () => {
  return (
    <GradientBox>
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 700,
              color: 'white',
              mb: 2,
              letterSpacing: '-0.025em',
            }}
          >
            Sentinela
          </Typography>
          
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 6,
              fontWeight: 300,
              letterSpacing: '0.1em',
            }}
          >
            subtítulo legal
          </Typography>

          <StyledButton>
            Comece Agora!
          </StyledButton>
        </Box>
      </Container>
    </GradientBox>
  );
};