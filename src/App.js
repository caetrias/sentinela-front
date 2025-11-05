import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { Dashboards } from './pages/Dashboards';
import { Previsoes } from './pages/Previsoes';
import { Sobre } from './pages/Sobre';
import { GuiaAPI } from './pages/GuiaAPI';

const GradientBox = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #22c55e 0%, #059669 50%, #0d9488 100%)',
});

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'dashboards':
        return <Dashboards />;
      case 'previsoes':
        return <Previsoes />;
      case 'sobre':
        return <Sobre />;
      case 'api':
        return <GuiaAPI />;
      default:
        return <Home />;
    }
  };

  return (
    <GradientBox>
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </GradientBox>
  );
}