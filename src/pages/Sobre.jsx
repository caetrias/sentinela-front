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
    role: 'Developer', 
    image: '/path/to/image1.jpg',
    placeholder: 'GC'
  },
  { 
    id: 2,
    name: 'Sofia Valadares', 
    role: 'Developer', 
    image: '/path/to/image2.jpg',
    placeholder: 'SV'
  },
  { 
    id: 3,
    name: 'Danilo Melo', 
    role: 'Developer', 
    image: '/path/to/image3.jpg',
    placeholder: 'DM'
  },
  { 
    id: 4,
    name: 'João Fittipaldi', 
    role: 'Developer', 
    image: '/path/to/image4.jpg',
    placeholder: 'JF'
  },
  { 
    id: 5,
    name: 'Marina Frias', 
    role: 'Developer', 
    image: '/path/to/image5.jpg',
    placeholder: 'MF'
  },
  { 
    id: 6,
    name: 'Luiza Calife', 
    role: 'Developer', 
    image: '/path/to/image6.jpg',
    placeholder: 'LC'
  },
  { 
    id: 7,
    name: 'Arthur Suzuki', 
    role: 'Developer', 
    image: '/path/to/image7.jpg',
    placeholder: 'AS'
  },
  { 
    id: 8,
    name: 'Guilherme Araújo', 
    role: 'Developer', 
    image: '/path/to/image8.jpg',
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
                  {/* Simplificando a lógica de verificação da imagem */}
                  <StyledAvatar>
                    {member.placeholder}
                  </StyledAvatar>
                  
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
            Um texto muito bom e convincente que explique porque estamos fazendo o que 
            fazemos e como vamos atingir o objetivo que desejamos atingir!
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