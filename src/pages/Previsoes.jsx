import React from 'react';
import { useState } from "react";
import { Box, Typography, Container, Button, TextField, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios';


export const Operacoes = () => {

  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  const [daysWithoutRain, setDaysWithoutRain] = React.useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isStarting, setIsStarting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionMessage, setPredictionMessage] = useState(null);
  const [predictionRisk, setPredictionRisk] = useState(null); // 0 = baixo, 1 = alto
  const [imageRisk, setImageRisk] = useState(null);

  const handleStartSystemClick = async (event) => {
    event.preventDefault();
    setIsStarting(true);

    try {
      const res = await axios.get("https://sentinela-bii6.onrender.com/sent/ping");
      console.log(res.data);
      setHasStarted(true);

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
    console.log("Sistema iniciado");
    setIsStarting(false);
  };

  const handlePredictionClick = async (event) => {
    event.preventDefault();
    if (!latitude || !longitude || !daysWithoutRain) {
      setPredictionMessage('Por favor, preencha os campos de latitude, longitude e dias sem chuva antes de solicitar a predição.');
      return;
    }

    setPredictionLoading(true);
    setPredictionMessage(null);
    try {
      const url = `https://sentinela-bii6.onrender.com/sent/predict?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&days_without_rain=${encodeURIComponent(daysWithoutRain)}`;
      const res = await axios.get(url);
      const val = res.data;
      // A API pode retornar { risco: 1 } ou 0/1 direto. Normalizar.
      let risco = null;
      if (val && typeof val === 'object' && Object.prototype.hasOwnProperty.call(val, 'risco')) {
        risco = Number(val.risco);
      } else {
        const str = String(val).trim();
        if (str === '1' || str === '0') risco = Number(str);
      }

      if (risco === 1) {
        setPredictionRisk(1);
        setPredictionMessage('Resultado: alto risco de precipitação.');
      } else if (risco === 0) {
        setPredictionRisk(0);
        setPredictionMessage('Resultado: baixo risco de precipitação.');
      } else {
        setPredictionRisk(null);
        setPredictionMessage(`Resposta inesperada recebida da API: ${JSON.stringify(val)}`);
      }
    } catch (err) {
      console.error('ERRO COMPLETO:', err);
      if (err.response) {
        setPredictionMessage(`Erro na requisição (status ${err.response.status}): ${JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        setPredictionMessage('Erro: sem resposta do servidor. Verifique a conexão de rede ou se o endpoint está disponível.');
      } else {
        setPredictionMessage(`Erro ao processar a solicitação: ${err.message}`);
      }
    } finally {
      setPredictionLoading(false);
    }
  };

  const [imageLoading, setImageLoading] = useState(false);
  const [imageMessage, setImageMessage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const handleImageClick = async (event) => {
    event.preventDefault();
    if (!imageFile) {
      setImageMessage('Por favor, selecione um arquivo de imagem antes de enviar.');
      return;
    }

    setImageLoading(true);
    setImageMessage(null);
    setImageBase64(null);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const res = await axios.post('https://sentinela-bii6.onrender.com/sent/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const data = res.data;
      // API retorna 'insendio' (1/0) e 'imagem_base64'
      let insendio = null;
      if (data && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'insendio')) {
        insendio = Number(data.insendio);
      }

      if (insendio === 1) {
        setImageMessage('Análise: incêndio detectado na imagem.');
        setImageRisk(1);
      } else if (insendio === 0) {
        setImageMessage('Análise: nenhum incêndio detectado na imagem.');
        setImageRisk(0);
      } else {
        setImageMessage(`Resposta inesperada recebida da API: ${JSON.stringify(data)}`);
        setImageRisk(null);
      }

      if (data && data.imagem_base64) {
        setImageBase64(data.imagem_base64);
      }
    } catch (err) {
      console.error('ERRO COMPLETO:', err);
      if (err.response) {
        setImageMessage(`Erro na requisição (status ${err.response.status}): ${JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        setImageMessage('Erro: sem resposta do servidor. Verifique a conexão de rede ou se o endpoint está disponível.');
      } else {
        setImageMessage(`Erro ao processar a solicitação: ${err.message}`);
      }
    } finally {
      setImageLoading(false);
    }
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setImageFile(selectedFile);
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: '3.5rem', fontWeight: 700, mb: 6, color: 'white' }}>
            Operações
          </Typography>
        </Box>

        {/* Botão principal para iniciar a API (agora 'Ligar API') */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartSystemClick}
            disabled={isStarting}
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
          >
            {isStarting ? 'Inicializando...' : 'Ligar API'}
          </Button>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mt: 1 }}>
            É necessário inicializar a API antes de usar as demais funções — isso pode levar alguns segundos.
          </Typography>
        </Box>
    
        {/* Seção: Previsão de Chuva */}
        <Box sx={{ backgroundColor: 'rgba(200, 200, 200, 0.15)', borderRadius: '16px', p: 4, mt: 7, textAlign: 'center', '& > :not(style)': { m: 1 } }}>
          <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700, mb: 6, color: 'white' }}>
            Previsão de Chuva
          </Typography>
          <TextField
            label="Latitude"
            variant="outlined"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder='-10.145694'
            helperText='Exemplo: -10.145694'
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.9)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,1)' },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.9)' },
              '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiInputBase-input': { color: 'white' }
            }}
          />
          <TextField
            label="Longitude"
            variant="outlined"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder='-36.876551'
            helperText='Exemplo: -36.876551'
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.9)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,1)' },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.9)' },
              '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiInputBase-input': { color: 'white' }
            }}
          />
          <TextField
            label="Dias sem chuva"
            variant="outlined"
            value={daysWithoutRain}
            onChange={(e) => setDaysWithoutRain(e.target.value)}
            placeholder='10'
            helperText='Exemplo: 10'
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.9)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,1)' },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.9)' },
              '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiInputBase-input': { color: 'white' }
            }}
          />

          {/* Ações: predição */}
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handlePredictionClick} disabled={!hasStarted || predictionLoading}>
              {predictionLoading ? (
                <>
                  <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                  Aguardando...
                </>
              ) : (
                'Predição'
              )}
            </Button>
          </Box>

          {/* Resultado da predição */}
          {predictionMessage && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mt: 2 }}>
              {predictionRisk === 1 && <WarningIcon sx={{ color: '#ef4444' }} />}
              {predictionRisk === 0 && <CheckCircleIcon sx={{ color: '#22c55e' }} />}
              {predictionRisk === null && <ErrorOutlineIcon sx={{ color: '#94a3b8' }} />}
              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.95)' }}>{predictionMessage}</Typography>
            </Box>
          )}
        </Box>
        {/* Seção: Análise de Imagem */}
        <Box sx={{ backgroundColor: 'rgba(200, 200, 200, 0.15)', borderRadius: '16px', p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: '1.75rem', fontWeight: 700, mb: 4, color: 'white' }}>
            Análise de Imagem
          </Typography>
          <Box sx={{ mb: 2 }}>
            <input type="file" accept="image/*" onChange={handleFile} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleImageClick} disabled={!hasStarted || imageLoading}>
              {imageLoading ? (
                <>
                  <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                  Analisando...
                </>
              ) : (
                'Enviar imagem para análise'
              )}
            </Button>
          </Box>

          {imageMessage && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mt: 2 }}>
              {imageRisk === 1 && <WarningIcon sx={{ color: '#ef4444' }} />}
              {imageRisk === 0 && <CheckCircleIcon sx={{ color: '#22c55e' }} />}
              {imageRisk === null && <ErrorOutlineIcon sx={{ color: '#94a3b8' }} />}
              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.95)' }}>{imageMessage}</Typography>
            </Box>
          )}
          {imageBase64 && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <img src={`data:image/png;base64,${imageBase64}`} alt="Imagem analisada" style={{ maxWidth: '100%', border: '1px solid rgba(255,255,255,0.2)' }} />
            </Box>
          )}
        </Box>

        
      </Container>
    </Box>
  );
};