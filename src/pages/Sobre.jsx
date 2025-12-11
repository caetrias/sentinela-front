import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  color: 'white',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
});

const StyledAvatar = styled(Avatar)({
  width: '100%',
  height: 240,
  borderRadius: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  fontSize: '4rem',
});

const teamMembers = [
  { 
    id: 1,
    name: 'Gabriel Caetano', 
    role: 'Frontend Developer', 
    image: '/assets/team/gabriel-caetano.jpg',
    placeholder: 'GC'
  },
  { 
    id: 2,
    name: 'Sofia Valadares', 
    role: 'Backend Developer', 
    image: '/assets/team/sofia-valadares.jpg',
    placeholder: 'SV'
  },
  { 
    id: 3,
    name: 'Danilo Melo', 
    role: 'Data Cientist and Tech Lead', 
    image: '/assets/team/danilo-melo.jpg',
    placeholder: 'DM'
  },
  { 
    id: 4,
    name: 'João Fittipaldi', 
    role: 'QA', 
    image: '/assets/team/joao-fittipaldi.jpg',
    placeholder: 'JF'
  },
  { 
    id: 5,
    name: 'Marina Frias', 
    role: 'Developer', 
    image: '/assets/team/marina-frias.jpg',
    placeholder: 'MF'
  },
  { 
    id: 6,
    name: 'Luiza Calife', 
    role: 'Designer', 
    image: '/assets/team/luiza-calife.jpg',
    placeholder: 'LC'
  },
  { 
    id: 7,
    name: 'Arthur Suzuki', 
    role: 'Project Manager', 
    image: '/assets/team/arthur-suzuki.jpg',
    placeholder: 'AS'
  },
  { 
    id: 8,
    name: 'Guilherme Araújo', 
    role: 'Developer', 
    image: '/assets/team/guilherme-araujo.png',
    placeholder: 'GA'
  },
];

export const Sobre = () => {
  return (
    <Box sx={{ flex: 1, py: 8 }}>
      <Container maxWidth="lg">

        {/* Seção da Equipe */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              fontWeight: 700, 
              color: 'white',
              mb: 2 
            }}
          >
            Sobre Nós
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 8
            }}
          >
            Somos legais!
          </Typography>

          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <StyledCard>
                  {/* Renderiza a imagem quando existir; caso contrário mostra as iniciais */}
                  {member.image ? (
                    <StyledAvatar src={member.image} alt={member.name} variant="square" />
                  ) : (
                    <StyledAvatar>{member.placeholder}</StyledAvatar>
                  )}
                  
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                      {member.role}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

                {/* Seção de Motivação */}
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              fontWeight: 700, 
              color: 'white',
              mb: 4 
            }}
          >
            Nossa Motivação
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
              mb: 3
            }}
          >
            O Grupo Canidé reúne estudantes comprometidos em usar tecnologia para causar uma pequena,
            porém significativa, mudança no mundo. Trabalhamos de forma colaborativa para aprender, construir
            soluções práticas e apoiar a preservação do nosso bioma, sempre com foco em ensino e impacto social.
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontStyle: 'italic'
            }}
          >
            Porque é isso que define a Canindé! Um grupo muito massa e cheiroso!
          </Typography>
        </Box>
        
      </Container>
    </Box>
  );
};