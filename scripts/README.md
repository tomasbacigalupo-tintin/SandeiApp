# Scripts

This folder contains helper scripts for running the project. The main entry point
is `run_local.sh` located in the repository root.

## Choosing an environment file

`run_local.sh` expects a `.env` file in the project root. Copy the template that
matches your environment before executing the script:

```bash
# For development
cp .env.dev .env
./run_local.sh

# For production
cp .env.prod .env
./run_local.sh
```

Each service directory (`backend/`, `frontend/` and `ia-service/`) also provides
`.env.dev` and `.env.prod` templates. Copy the appropriate file to `.env` inside
that directory before building or running the container.
