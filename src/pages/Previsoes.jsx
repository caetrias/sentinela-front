import React from 'react';
import { useState } from "react";
import { Box, Typography, Container, Button, TextField } from '@mui/material';
import axios from 'axios';


export const Previsoes = () => {

  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  const [file, setFile] = useState(null);

  const handleStartSystemClick = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get("https://sentinela-bii6.onrender.com/sent/ping");
      console.log(res.data);
    } catch (err) {
      console.error("ERRO COMPLETO:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Status code:", err.response.status);
      } else if (err.request) {
        console.error("Request sem resposta:", err.request);
      } else {
        console.error("Erro ao configurar requisição:", err.message);
      }
    }
  };

  const handlePredictionClick = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`https://sentinela-bii6.onrender.com/sent/predict${latitude}/${longitude}`);
    } catch (err) {
      console.error("ERRO COMPLETO:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Status code:", err.response.status);
      } else if (err.request) {
        console.error("Request sem resposta:", err.request);
      } else {
        console.error("Erro ao configurar requisição:", err.message);
      }
    }
  };

  const handleImageClick = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get(`https://sentinela-bii6.onrender.com/sent/image${file}`);
      console.log(res.data);
    } catch (err) {
      console.error("ERRO COMPLETO:", err);
    }
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: '3.5rem', fontWeight: 700, mb: 2, color: 'white' }}>
            Previsões
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 4, '& > :not(style)': { m: 1 } }}>
          <TextField
            label="Latitude"
            variant="outlined"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <TextField
            label="Longitude"
            variant="outlined"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <div>
            <input type="file" onChange={handleFile} />
          </div>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 4, '& > :not(style)': { m: 1 } }}>
          <Button variant="contained" color="primary" href="/" onClick={handleStartSystemClick}>
            Iniciar o sistema
          </Button>
          <Button variant="contained" color="primary" href="/" onClick={handlePredictionClick}>
            Predição
          </Button>
          <Button variant="contained" color="primary" href="/" onClick={handleImageClick}>
            Imagem
          </Button>
        </Box>
      </Container>
    </Box>
  );
};