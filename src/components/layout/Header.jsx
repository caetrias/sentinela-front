import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box,
  Container
} from '@mui/material';
import { styled } from '@mui/system';
import { SentinelaLogo } from '../common/SentinelaLogo';

const StyledAppBar = styled(AppBar)({
  background: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(8px)',
  boxShadow: 'none',
});

const LogoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
});

const NavButton = styled(Button)(({ theme, active }) => ({
  color: 'white',
  padding: '8px 16px',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '8px',
  backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

export const Header = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'previsoes', label: 'Previsões' },
    { id: 'sobre', label: 'Sobre Nós' },
    { id: 'api', label: 'Guia da API' }
  ];

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', padding: '16px 0' }}>
          <LogoWrapper onClick={() => onNavigate('home')}>
            <SentinelaLogo />
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 600,
                letterSpacing: '-0.025em',
              }}
            >
              Sentinela
            </Typography>
          </LogoWrapper>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {menuItems.map((item) => (
              <NavButton
                key={item.id}
                active={currentPage === item.id}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </NavButton>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};