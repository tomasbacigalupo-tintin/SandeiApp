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

if command -v docker compose >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker-compose"
else
  echo "Docker Compose is required but was not found. Please install Docker."
  exit 1
fi

$DOCKER_COMPOSE -f infra/docker-compose.yml up --build
