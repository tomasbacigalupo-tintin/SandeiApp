# Backend (NestJS)

Este directorio contiene la API REST de **SandeiApp** desarrollada con [NestJS](https://nestjs.com).

## Instalación

```bash
cd backend
npm install
```

En desarrollo se puede iniciar con:

```bash
npm run start:dev
```

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores requeridos:

- `BACKEND_PORT` &ndash; puerto donde se inicia la aplicación (3000 por defecto).
- `DATABASE_URL` &ndash; cadena de conexión utilizada por TypeORM.
- `JWT_SECRET` &ndash; clave para firmar los JWT.
- `IA_SERVICE_URL` &ndash; URL del servicio de IA.
- `DB_LOGGING` &ndash; habilita el log de consultas de TypeORM (`true`/`false`).

Estas variables se utilizan tanto en modo local como al ejecutar la imagen Docker.

## Scripts de npm

- `npm run start` &ndash; ejecuta el backend compilado.
- `npm run start:dev` &ndash; arranca NestJS con recarga en caliente.
- `npm run build` &ndash; compila los archivos TypeScript en `dist/`.
- `npm run format` &ndash; formatea el código con Prettier.
- `npm run lint` &ndash; ejecuta ESLint.
- `npm run test` &ndash; pruebas unitarias.
- `npm run test:cov` &ndash; pruebas con reporte de cobertura.
- `npm run test:e2e` &ndash; pruebas end-to-end.
- `npm run typeorm` &ndash; CLI de TypeORM.

## Ejecutar pruebas

Desde `backend/` se puede generar el informe de cobertura con:

```bash
npm run test:cov
```

## Docker

Construye la imagen y ejecútala pasando el archivo `.env`:

```bash
docker build -t sandei-backend .
docker run --env-file .env -p 3000:3000 sandei-backend
```

El contenedor expone el puerto definido en `BACKEND_PORT`.

