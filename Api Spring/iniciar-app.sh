#!/bin/bash

# Script para iniciar Backend (Spring Boot) e Frontend (Angular) simultaneamente

echo "Iniciando Aplicação CRUD de Pessoas (Spring Boot)..."
echo "=========================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Diretórios - detecta automaticamente a partir da localização do script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/pessoa-api"
FRONTEND_DIR="$(cd "$SCRIPT_DIR/../Frontend/pessoa-frontend" 2>/dev/null && pwd)"

# Função para verificar se uma porta está em uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0  # Porta em uso
    else
        return 1  # Porta livre
    fi
}

# Verificar portas
echo -e "${BLUE}Verificando portas...${NC}"
if check_port 8080; then
    echo -e "${RED}❌ Porta 8080 já está em uso!${NC}"
    echo "Execute: lsof -i :8080 para ver o processo"
    exit 1
fi

if check_port 4200; then
    echo -e "${RED}❌ Porta 4200 já está em uso!${NC}"
    echo "Execute: lsof -i :4200 para ver o processo"
    exit 1
fi

echo -e "${GREEN}✅ Portas 8080 e 4200 estão disponíveis${NC}"
echo ""

# Verificar se os diretórios existem
if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${RED}❌ Diretório do backend não encontrado: $BACKEND_DIR${NC}"
    exit 1
fi

if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}❌ Diretório do frontend não encontrado: $FRONTEND_DIR${NC}"
    exit 1
fi

# Criar logs directory
LOG_DIR="$SCRIPT_DIR/logs"
mkdir -p "$LOG_DIR"

# Garantir que o gradlew seja executável
chmod +x "$BACKEND_DIR/gradlew"

# Instalar dependências do frontend se necessário
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependências do frontend (npm install)...${NC}"
    cd "$FRONTEND_DIR" && npm install
    echo -e "${GREEN}✅ Dependências do frontend instaladas${NC}"
    echo ""
fi

# Iniciar Backend
echo -e "${BLUE}🔧 Iniciando Backend (Spring Boot - porta 8080)...${NC}"
cd "$BACKEND_DIR"
nohup ./gradlew bootRun > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"
echo "$BACKEND_PID" > "$LOG_DIR/backend.pid"
echo ""

# Aguardar backend iniciar (30 segundos)
echo -e "${YELLOW}⏳ Aguardando backend inicializar (30s)...${NC}"
sleep 30

# Verificar se backend está rodando
if ! ps -p $BACKEND_PID > /dev/null; then
    echo -e "${RED}❌ Backend falhou ao iniciar! Verifique o log em $LOG_DIR/backend.log${NC}"
    exit 1
fi

# Iniciar Frontend
echo -e "${BLUE}🎨 Iniciando Frontend (Angular - porta 4200)...${NC}"
cd "$FRONTEND_DIR"
nohup npm start > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
echo "$FRONTEND_PID" > "$LOG_DIR/frontend.pid"
echo ""

# Aguardar frontend iniciar (40 segundos)
echo -e "${YELLOW}⏳ Aguardando frontend inicializar (40s)...${NC}"
sleep 40

# Verificar se frontend está rodando
if ! ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${RED}❌ Frontend falhou ao iniciar! Verifique o log em $LOG_DIR/frontend.log${NC}"
    # Matar backend
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Aplicação iniciada com sucesso!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📍 URLs de Acesso:${NC}"
echo -e "   Frontend: ${YELLOW}http://localhost:4200${NC}"
echo -e "   Backend:  ${YELLOW}http://localhost:8080/api/pessoas${NC}"
echo ""
echo -e "${BLUE}📋 Processos:${NC}"
echo -e "   Backend PID:  ${YELLOW}$BACKEND_PID${NC}"
echo -e "   Frontend PID: ${YELLOW}$FRONTEND_PID${NC}"
echo ""
echo -e "${BLUE}📝 Logs:${NC}"
echo -e "   Backend:  tail -f $LOG_DIR/backend.log"
echo -e "   Frontend: tail -f $LOG_DIR/frontend.log"
echo ""
echo -e "${BLUE}🛑 Para parar a aplicação:${NC}"
echo -e "   Execute: ${YELLOW}./parar-app.sh${NC}"
echo ""
echo -e "${GREEN}Para testar em seu navegador: http://localhost:4200${NC}"
echo ""

