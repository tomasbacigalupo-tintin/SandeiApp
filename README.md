# SandeiApp v1.0

SandeiApp es una aplicación full stack para la gestión de jugadores, formaciones tácticas y partidos. El sistema combina un backend en NestJS con una base de datos PostgreSQL, un frontend moderno basado en React y Vite, y un servicio de inteligencia artificial desarrollado con FastAPI. **Esta versión está lista para su presentación final al Product Owner.**

---

## Requisitos

- Node.js 20 o superior


Estructura del proyecto:

- backend/ → API REST con NestJS + TypeORM
- frontend/ → Interfaz de usuario en React + Vite + Tailwind
- ia-service/ → Servicio de IA con FastAPI
- infra/ → Infraestructura y orquestación con Docker Compose
- .github/ → Workflows de CI/CD con GitHub Actions
- README.md

---

Funcionalidades principales:

Autenticación:

- Registro e inicio de sesión con JWT
- Protección de rutas (backend y frontend)
- Almacenamiento del token en localStorage

Gestión de jugadores:

- CRUD completo de jugadores
- Búsqueda de jugadores por nombre
- Campos: id, name, stats (JSONB), fitness, technical
- Validaciones con class-validator
- Hook usePlayers() en frontend con integración a la API
- Gestión de formaciones con endpoints protegidos
- Registro de calificaciones por jugador

Servicio de IA:

- Servicio REST en FastAPI preparado para integrar funcionalidades de análisis inteligente
- Módulo IA en el backend para futuras integraciones
- Endpoint `/ia/analyze_performance` para evaluar el rendimiento según las calificaciones

---

Uso con Docker:

Desde la raíz del proyecto puedes ejecutar:

```bash
./run_local.sh
```

El script generará el archivo `.env` a partir de `.env.example` si no existe y
comprobará que las variables esenciales estén completas antes de iniciar Docker
Compose.

Si prefieres hacerlo manualmente:

docker-compose up --build

Para desplegar las imágenes ya publicadas en un registro se incluye
`infra/docker-compose.prod.yml`.  Ajusta la variable `REGISTRY_USER` con tu
nombre de usuario en el registro y ejecuta:

```bash
REGISTRY_USER=<usuario> docker-compose -f infra/docker-compose.prod.yml up -d
```

Servicios incluidos:

- PostgreSQL
- MongoDB
- Redis
- RabbitMQ
- Backend (NestJS)
- Frontend (React)
- Servicio IA (FastAPI)

El archivo `infra/swagger.yaml` describe los endpoints principales como
`/ia/suggest_lineup` y el registro de calificaciones.

Asegurarse de copiar `.env.example` a `.env` en cada servicio (`backend/`,
`frontend/` e `ia-service/`) y completar los valores necesarios.
Para levantar la infraestructura con Docker Compose también se incluye un
archivo `.env.example` en la raíz del proyecto. Cópialo a `.env` y ajusta las
variables según tu entorno.

La conexión a la base de datos se configura mediante la variable
`DATABASE_URL` incluida en dichos archivos.

El frontend utiliza la variable `VITE_API_URL` para apuntar a la URL base del backend.
Los directorios `backend/` y `frontend/` incluyen Dockerfiles para construir las imágenes de ambos servicios.

### Variables de entorno

El archivo `.env.example` ubicado en la raíz define las credenciales y puertos
que utiliza Docker Compose. Copia este archivo a `.env` y ajusta los valores
según tu entorno. Las principales variables son:

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: credenciales de PostgreSQL.
- `MONGO_USER`, `MONGO_PASSWORD`: credenciales de MongoDB.
- `REDIS_PASSWORD`: contraseña utilizada por Redis.
- `RABBITMQ_USER`, `RABBITMQ_PASSWORD`: usuario y contraseña de RabbitMQ.
- `BACKEND_PORT`: puerto expuesto por el servicio backend.
- `FASTAPI_PORT`: puerto del servicio de IA.
- `REGISTRY_USER` y `TAG`: usados por `docker-compose.prod.yml` para indicar el
  repositorio y la etiqueta de las imágenes.

Cada servicio cuenta además con su propio `.env.example` donde se incluyen
variables específicas como `JWT_SECRET`, `IA_SERVICE_URL`, `VITE_API_URL` u
`OPENAI_API_KEY`.

---

Uso sin Docker (modo desarrollo):

Backend:

cd backend  
npm install  
npm run start:dev

Frontend:

cd frontend  
npm install  
npm run dev

Servicio IA:

cd ia-service  
pip install -r requirements.txt  
uvicorn main:app --reload

Pruebas:

Backend:

cd backend
npm run test

Frontend:

cd frontend
npm run test


---

Migraciones con TypeORM:

Las migraciones utilizan la URL definida en `DATABASE_URL` para conectarse a
la base de datos.

Generar migración:

npx typeorm migration:generate src/migrations/CreatePlayersTable -d src/data-source.ts

Ejecutar migración:

npx typeorm migration:run -d src/data-source.ts

---

CI/CD:

Los flujos de integración continua están definidos en `.github/workflows/` y
construyen y publican las imágenes de Docker de cada servicio:

- `backend.yml` → lint, test y push del backend
- `frontend.yml` → lint, build estático y push del frontend
- `ia-service.yml` → lint, test y push del servicio IA

Para autenticarse en el registro, configura en el repositorio los secretos
`DOCKERHUB_USERNAME` y `DOCKERHUB_TOKEN` con tus credenciales de Docker Hub (o
registro compatible).

---

Tecnologías utilizadas:

- Backend: NestJS, TypeORM, PostgreSQL
- Frontend: React, Vite, TailwindCSS, shadcn/ui
- IA: FastAPI (Python)
- Infraestructura: Docker Compose
- CI/CD: GitHub Actions

---

Autores:

Tomás Bacigalupo | Joaquín Romero  
GitHub: https://github.com/tomasbacigalupo-tintin | https://github.com/JoaquinRomeroVillagra
