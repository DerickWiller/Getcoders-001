#!/bin/bash

# Script para parar Backend NestJS e Frontend

echo "Parando Aplicação CRUD de Pessoas (NestJS)..."
echo "=========================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"

# Parar Backend
if [ -f "$LOG_DIR/backend.pid" ]; then
    BACKEND_PID=$(cat "$LOG_DIR/backend.pid")
    echo -e "${YELLOW}🔧 Parando Backend NestJS (PID: $BACKEND_PID)...${NC}"
    pkill -P $BACKEND_PID 2>/dev/null
    kill $BACKEND_PID 2>/dev/null
    pkill -f "nest start" 2>/dev/null
    pkill -f "pessoa-api-nest" 2>/dev/null
    rm "$LOG_DIR/backend.pid"
    echo -e "${GREEN}✅ Backend parado${NC}"
else
    echo -e "${YELLOW}⚠️  PID do backend não encontrado${NC}"
    pkill -f "nest start" 2>/dev/null
    pkill -f "pessoa-api-nest" 2>/dev/null
fi

echo ""

# Parar Frontend
if [ -f "$LOG_DIR/frontend.pid" ]; then
    FRONTEND_PID=$(cat "$LOG_DIR/frontend.pid")
    echo -e "${YELLOW}🎨 Parando Frontend (PID: $FRONTEND_PID)...${NC}"
    pkill -P $FRONTEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    pkill -f "ng serve" 2>/dev/null
    pkill -f "@angular/cli" 2>/dev/null
    rm "$LOG_DIR/frontend.pid"
    echo -e "${GREEN}✅ Frontend parado${NC}"
else
    echo -e "${YELLOW}⚠️  PID do frontend não encontrado${NC}"
    pkill -f "ng serve" 2>/dev/null
    pkill -f "@angular/cli" 2>/dev/null
fi

echo ""

# Verificar portas
echo -e "${YELLOW}🔍 Verificando se as portas foram liberadas...${NC}"
sleep 2

PORT_3000=$(lsof -i :3000 2>/dev/null | wc -l)
PORT_4200=$(lsof -i :4200 2>/dev/null | wc -l)

if [ $PORT_3000 -eq 0 ]; then
    echo -e "${GREEN}✅ Porta 3000 liberada${NC}"
else
    echo -e "${RED}❌ Porta 3000 ainda está em uso${NC}"
fi

if [ $PORT_4200 -eq 0 ]; then
    echo -e "${GREEN}✅ Porta 4200 liberada${NC}"
else
    echo -e "${RED}❌ Porta 4200 ainda está em uso${NC}"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Processo de parada concluído!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

