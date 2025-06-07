##### Fase 1: build #####
FROM node:20-alpine AS deps
WORKDIR /app

# Copio los manifiestos de npm e instalo dependencias
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copio el resto del código y compilo
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


##### Fase 2: runtime slim #####
FROM node:20-alpine
WORKDIR /app

# Solo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# Paso los artefactos compilados
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]

