##### Fase 1: build #####
FROM node:20-alpine AS builder
WORKDIR /app

# Copio solo los manifests para aprovechar caché
COPY package*.json ./

# Instalo todas las dependencias sin chequear peer-deps
RUN npm install --legacy-peer-deps

# Copio el resto del código y compilo
COPY . .
RUN npm run build


##### Fase 2: runtime slim #####
FROM node:20-alpine
WORKDIR /app

# Solo dependencias de producción, también sin peer-deps
COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

# Paso los artefactos compilados
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]

