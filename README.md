# SandeiApp

SandeiApp es una plataforma full stack para entrenadores que necesitan gestionar jugadores, formaciones tácticas y obtener predicciones basadas en IA.

## Tecnologías clave
- **Frontend:** React + Vite + TypeScript
- **Backend:** NestJS + PostgreSQL
- **Servicio IA:** FastAPI (Python)
- **Infraestructura:** Docker Compose

## Arquitectura
```
Navegador ──► Frontend ──► Backend ──► PostgreSQL
                           │
                           └──► IA Service (FastAPI)
```
Servicios adicionales como MongoDB, Redis y RabbitMQ se utilizan para tareas internas y están definidos en la composición de Docker.

## Requisitos
- Docker y Docker Compose
- Node.js 20+ y npm (para desarrollo frontend/back)
- Python 3.9+ (para desarrollo del servicio de IA)
- Opcional: PostgreSQL, Redis, MongoDB y RabbitMQ si no se usan contenedores

## Instalación y ejecución local
1. Clona este repositorio.
2. Copia el archivo `.env.example` de la raíz a `.env` y repite lo mismo en `backend/`, `frontend/` e `ia-service/`. Completa luego los valores necesarios. En particular, verifica que `frontend/.env` defina `VITE_API_URL` apuntando al backend, por ejemplo:
   ```ini
   VITE_API_URL=http://localhost:3100
   ```
3. Levanta todo con Docker Compose:
```bash
./run_local.sh
# o bien
docker-compose -f infra/docker-compose.yml up --build
```
### Modo desarrollo sin Docker
```bash
# Backend
cd backend && npm install && npm run start:dev

# Frontend
cd ../frontend && npm install && npm run dev

# Servicio IA
cd ../ia-service && pip install -r requirements.txt && uvicorn app.main:app --reload
```

## Uso de la aplicación
- El frontend estará disponible en [http://localhost:5173](http://localhost:5173).
- Registra usuarios y carga jugadores desde la interfaz.
- Consulta el módulo de IA para obtener tácticas y predicciones de partido.

### Verificación rápida
Una vez configurado el entorno, levanta los contenedores:

```bash
docker-compose -f infra/docker-compose.yml up --build -d
```

Luego abre la aplicación y prueba registrarte o iniciar sesión. Las peticiones deberían dirigirse a `http://localhost:3100` sin mostrar rutas `undefined/api/...`.

## Testing y CI
- Backend: `npm run test`
- Frontend: `npm run test`
- IA service: `pytest`

El repositorio incluye flujos de GitHub Actions en `.github/workflows/` que ejecutan lint, tests y despliegue de imágenes Docker.

## Estructura del proyecto
- `backend/` – API REST con NestJS y TypeORM
- `frontend/` – Aplicación React + Vite
- `ia-service/` – Servicio IA en FastAPI
- `infra/` – Definición de servicios y bases de datos con Docker Compose
- `docs/` – Documentación adicional

## Nuevos módulos
- Multi-tenant con `TenantMiddleware` y migraciones.
- Autenticación centralizada con Keycloak.
- Módulos de tácticas y scouting de jugadores.

## Contribuciones
Las contribuciones son bienvenidas mediante *pull requests*. Asegúrate de seguir una descripción clara de los cambios y asociar los issues correspondientes si existen.

## Licencia
Distribuido bajo la [licencia MIT](LICENSE).

## Autores
Tomás Bacigalupo y Joaquín Romero

