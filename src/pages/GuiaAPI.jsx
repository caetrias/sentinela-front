import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

export const GuiaAPI = () => {
  return (
    <Box sx={{ flex: 1, py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: 'white', textAlign: 'center' }}>
          Guia da API — Sentinela
        </Typography>

        <Typography sx={{ color: 'rgba(255,255,255,0.9)', mb: 3 }}>
          O Sentinela é um sistema de monitoramento e análise ambiental focado na Caatinga, desenvolvido por
          estudantes de Ciência da Computação da CESAR School (grupo Canidé). A API foi criada para facilitar a
          análise de dados sobre risco de incêndios e focos de queimadas, com foco em ser acessível e educativa.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>Repositório</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Código da API: <Link href="https://github.com/SofiaValadares/SENTINELA" target="_blank" rel="noopener" sx={{ color: 'lightblue' }}>https://github.com/SofiaValadares/SENTINELA</Link>
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Front da documentação: <Link href="https://github.com/caetrias/sentinela-front" target="_blank" rel="noopener" sx={{ color: 'lightblue' }}>https://github.com/caetrias/sentinela-front</Link>
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>Pré-requisitos</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>- Git</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>- Python 3.10+ (ou conforme `pyproject.toml`)</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>- Opcional: Postman para testar endpoints</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>Clonar o repositório</Typography>
          <Box component="pre" sx={{ background: 'rgba(0,0,0,0.35)', color: 'white', p: 2, borderRadius: 1, fontFamily: 'monospace' }}>
{`git clone https://github.com/SofiaValadares/SENTINELA.git
cd SENTINELA`}
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>Configurar ambiente virtual (venv)</Typography>

          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}><b>Windows (PowerShell)</b></Typography>
          <Box component="pre" sx={{ background: 'rgba(0,0,0,0.35)', color: 'white', p: 2, borderRadius: 1, fontFamily: 'monospace' }}>
{`python -m venv .venv
# Ativar (PowerShell)
.\\.venv\\Scripts\\Activate.ps1

# Entrar na pasta do pacote e instalar
cd fast_sentinela
python -m pip install --upgrade pip
python -m pip install .`}
          </Box>

          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}><b>Linux / macOS</b></Typography>
          <Box component="pre" sx={{ background: 'rgba(0,0,0,0.35)', color: 'white', p: 2, borderRadius: 1, fontFamily: 'monospace' }}>
{`python3 -m venv .venv
# Ativar
source .venv/bin/activate

# Entrar na pasta do pacote e instalar
cd fast_sentinela
python -m pip install --upgrade pip
python -m pip install .`}
          </Box>

          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
            Observação: se o `pyproject.toml` exigir uma versão superior (ex.: &gt;=3.14), use uma versão compatível
            ou um ambiente (pyenv, container) apropriado para desenvolvimento.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>Executar a API</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
            Com o ambiente virtual ativo e estando dentro da pasta <code>fast_sentinela</code> rode:
          </Typography>
          <Box component="pre" sx={{ background: 'rgba(0,0,0,0.35)', color: 'white', p: 2, borderRadius: 1, fontFamily: 'monospace' }}>
{`uvicorn fast_sentinela.app:app --reload --host 0.0.0.0 --port 8000`}
          </Box>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>A API ficará disponível em <b>http://127.0.0.1:8000</b>. Os endpoints principais ficam sob o prefixo <code>/sent</code>.</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>Endpoints úteis</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}><b>GET /sent/ping</b> — Verifica se a API está no ar.</Typography>
          <Box component="pre" sx={{ background: 'rgba(0,0,0,0.2)', color: 'white', p: 1, borderRadius: 1, fontFamily: 'monospace' }}>
{`curl http://127.0.0.1:8000/sent/ping`}
          </Box>

          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}><b>GET /sent/predict</b> — Predição de risco</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', mb: 1 }}>Parâmetros: <code>latitude</code>, <code>longitude</code>, <code>days_without_rain</code> (obrigatórios).</Typography>
          <Box component="pre" sx={{ background: 'rgba(0,0,0,0.2)', color: 'white', p: 1, borderRadius: 1, fontFamily: 'monospace' }}>
{`curl "http://127.0.0.1:8000/sent/predict?latitude=-7.9&longitude=-37.1&days_without_rain=10"`}
          </Box>

          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}><b>POST /sent/image</b> — Envia uma imagem para análise</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', mb: 1 }}>Envie o arquivo no campo <code>file</code> como form-data.</Typography>
          <Box component="pre" sx={{ background: 'rgba(0,0,0,0.2)', color: 'white', p: 1, borderRadius: 1, fontFamily: 'monospace' }}>
{`curl -X POST "http://127.0.0.1:8000/sent/image" -F "file=@/caminho/para/imagem.jpg"`}
          </Box>

          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
            A resposta geralmente inclui se há incêndio detectado e, quando aplicável, uma imagem tratada em base64.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>Dicas e observações</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
            - Use a rota <code>/sent/ping</code> para checar se o servidor está respondendo antes de fazer chamadas.
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
            - Se ocorrerem erros 404 ao carregar dados ou imagens, verifique caminhos e permissões locais.
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
            - Documentação completa será adicionada futuramente no repositório.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};