SandeiApp

SandeiApp es una aplicación full stack para la gestión de jugadores, formaciones tácticas y partidos. El sistema combina un backend en NestJS con una base de datos PostgreSQL, un frontend moderno basado en React y Vite, y un servicio de inteligencia artificial desarrollado con FastAPI.

---

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

Desde la raíz del proyecto:

docker-compose up --build

Servicios incluidos:

- PostgreSQL
- MongoDB
- Redis
- RabbitMQ
- Backend (NestJS)
- Frontend (React)
- Servicio IA (FastAPI)

Asegurarse de copiar `.env.example` a `.env` de forma local y completar los valores necesarios.

El frontend utiliza la variable `VITE_API_URL` para apuntar a la URL base del backend.
Los directorios `backend/` y `frontend/` incluyen Dockerfiles para construir las imágenes de ambos servicios.

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

---

Migraciones con TypeORM:

Generar migración:

npx typeorm migration:generate src/migrations/CreatePlayersTable -d src/data-source.ts

Ejecutar migración:

npx typeorm migration:run -d src/data-source.ts

---

CI/CD:

Los flujos de integración continua están definidos en .github/workflows/

- backend.yml → lint, test y build Docker del backend
- frontend.yml → lint y build estático del frontend
- ia-service.yml → lint y test del servicio IA

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
