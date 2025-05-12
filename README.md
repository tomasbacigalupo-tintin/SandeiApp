# My Project

Este repositorio contiene cuatro módulos principales:

- **backend/**: API construida con NestJS  
- **frontend/**: SPA con React y TypeScript  
- **ia-service/**: Servicio de IA con FastAPI (Python)  
- **infra/**: Definición de infraestructura Docker Compose  

## Prerrequisitos

- Docker  
- Docker Compose (v1.28+)

## Levantar el entorno

1. Copia el archivo de ejemplo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
2. Ajusta valores en `.env` si es necesario.
3. Inicia todos los servicios:
   ```bash
   cd infra
   docker-compose up -d
   ```
4. Accede a:
   - NestJS API:  http://localhost:3000  
   - React App:   http://localhost:3001  
   - FastAPI:     http://localhost:8000/docs  
   - RabbitMQ UI: http://localhost:15672  
5. Para detener el entorno:
   ```bash
   docker-compose down
   ```
