#!/usr/bin/env bash
# run_local.sh - Start SandeiApp locally using Docker Compose

set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

if [ ! -f .env ]; then
  echo "[run_local] .env not found. Creating from .env.example"
  cp .env.example .env
  echo "[run_local] Review the generated .env file and update values as needed"
fi

# Validate required variables are present and not empty
required_vars=(\
  POSTGRES_USER POSTGRES_PASSWORD POSTGRES_DB \
  MONGO_USER MONGO_PASSWORD REDIS_PASSWORD \
  RABBITMQ_USER RABBITMQ_PASSWORD
)

check_env_var() {
  local value
  value=$(grep -E "^$1=" .env | cut -d '=' -f2-)
  if [ -z "$value" ]; then
    echo "[run_local] ERROR: $1 is not set in .env"
    return 1
  fi
}

for var in "${required_vars[@]}"; do
  check_env_var "$var" || missing=true
done

if [ "$missing" = true ]; then
  echo "[run_local] Please complete the required variables in .env before continuing."
  exit 1
fi

if command -v docker compose >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker-compose"
else
  echo "Docker Compose is required but was not found. Please install Docker."
  exit 1
fi

$DOCKER_COMPOSE -f infra/docker-compose.yml up --build
