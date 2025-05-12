# ⚽ SandeiApp

**SandeiApp** es una plataforma full stack diseñada para la gestión de jugadores, formaciones y partidos, combinando backend robusto (NestJS), frontend moderno (React + Vite + Tailwind) e integración con un servicio de IA (FastAPI).

---

## 📁 Estructura del Proyecto

```plaintext
.
├── backend/              # API REST con NestJS + TypeORM + PostgreSQL
├── frontend/             # React + Vite + Tailwind + shadcn/ui
├── ia-service/           # Servicio de IA con FastAPI (Python)
├── infra/                # Infraestructura con Docker Compose
└── .github/              # CI/CD (GitHub Actions)
🚀 Funcionalidades
🔐 Autenticación
Registro y login con JWT

Protección de rutas (backend + frontend)

authService maneja tokens en frontend

⚽ Gestión de Jugadores
CRUD completo desde UI

Campos: name, stats (JSONB), fitness, technical

Backend modularizado (players.module.ts)

Validaciones con class-validator

Integración API → React con axios (autenticado)

🧠 Servicio IA (FastAPI)
Preparado para procesamiento y análisis inteligente de datos deportivos

🐳 Levantar el proyecto (Docker)
Desde la raíz del proyecto:

bash
Copiar
Editar
docker-compose up --build
Incluye:

PostgreSQL

MongoDB

Redis

RabbitMQ

Backend

Frontend

Servicio IA

Verificá variables en .env.example y completá .env en infra/.

🧪 Modo Dev (sin Docker)
Backend
bash
Copiar
Editar
cd backend
npm install
npm run start:dev
Frontend
bash
Copiar
Editar
cd frontend
npm install
npm run dev
🔧 Migraciones con TypeORM
Generar migración:
bash
Copiar
Editar
npx typeorm migration:generate src/migrations/CreatePlayersTable -d src/data-source.ts
Ejecutar migraciones:
bash
Copiar
Editar
npx typeorm migration:run -d src/data-source.ts
Verificá que src/data-source.ts esté apuntando a tu base PostgreSQL.

🔄 CI/CD (GitHub Actions)
Workflows definidos en .github/workflows/:

backend.yml → lint, tests (Jest), build Docker

frontend.yml → lint, build estático

ia-service.yml → lint flake8, tests Pytest, build Docker

🧙‍♂️ Tech Stack
Frontend: React + Vite + TypeScript + TailwindCSS + shadcn/ui

Backend: NestJS + TypeORM + PostgreSQL

IA Service: FastAPI

Infra: Docker Compose + GitHub Actions

👥 Autores
Tomás Bacigalupo — GitHub

✅ Próximos pasos
 Implementar React Query para estado global

 Reemplazar alert() por toasts con shadcn/ui

 CRUD de formaciones y partidos

 Integración completa con IA
