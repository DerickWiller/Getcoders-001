#!/bin/bash

# Script para parar Backend e Frontend

echo "Parando Aplicação CRUD de Pessoas..."
echo "=========================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Detecta automaticamente a partir da localização do script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"

# Ler PIDs dos arquivos
if [ -f "$LOG_DIR/backend.pid" ]; then
    BACKEND_PID=$(cat "$LOG_DIR/backend.pid")
    echo -e "${YELLOW}🔧 Parando Backend (PID: $BACKEND_PID)...${NC}"
    
    # Matar o processo do Gradle e o Java
    pkill -P $BACKEND_PID 2>/dev/null
    kill $BACKEND_PID 2>/dev/null
    
    # Garantir que o Java do Spring Boot também seja terminado
    pkill -f "pessoa-api" 2>/dev/null
    pkill -f "DemoApplication" 2>/dev/null
    
    rm "$LOG_DIR/backend.pid"
    echo -e "${GREEN}✅ Backend parado${NC}"
else
    echo -e "${YELLOW}⚠️  PID do backend não encontrado${NC}"
    # Tentar matar pelo nome do processo
    pkill -f "pessoa-api" 2>/dev/null
    pkill -f "DemoApplication" 2>/dev/null
fi

echo ""

if [ -f "$LOG_DIR/frontend.pid" ]; then
    FRONTEND_PID=$(cat "$LOG_DIR/frontend.pid")
    echo -e "${YELLOW}🎨 Parando Frontend (PID: $FRONTEND_PID)...${NC}"
    
    # Matar o processo do npm e seus filhos
    pkill -P $FRONTEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    
    # Garantir que o ng serve também seja terminado
    pkill -f "ng serve" 2>/dev/null
    pkill -f "@angular/cli" 2>/dev/null
    
    rm "$LOG_DIR/frontend.pid"
    echo -e "${GREEN}✅ Frontend parado${NC}"
else
    echo -e "${YELLOW}⚠️  PID do frontend não encontrado${NC}"
    # Tentar matar pelo nome do processo
    pkill -f "ng serve" 2>/dev/null
    pkill -f "@angular/cli" 2>/dev/null
fi

echo ""

# Verificar portas
echo -e "${YELLOW}🔍 Verificando se as portas foram liberadas...${NC}"
sleep 2

PORT_8080=$(lsof -i :8080 2>/dev/null | wc -l)
PORT_4200=$(lsof -i :4200 2>/dev/null | wc -l)

if [ $PORT_8080 -eq 0 ]; then
    echo -e "${GREEN}✅ Porta 8080 liberada${NC}"
else
    echo -e "${RED}❌ Porta 8080 ainda está em uso${NC}"
    echo "   Execute: lsof -i :8080 | kill -9 PID"
fi

if [ $PORT_4200 -eq 0 ]; then
    echo -e "${GREEN}✅ Porta 4200 liberada${NC}"
else
    echo -e "${RED}❌ Porta 4200 ainda está em uso${NC}"
    echo "   Execute: lsof -i :4200 | kill -9 PID"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Processo de parada concluído!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

