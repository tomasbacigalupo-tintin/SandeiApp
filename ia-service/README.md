# IA Service

Este servicio implementa una API REST con [FastAPI](https://fastapi.tiangolo.com/) que actúa como módulo de inteligencia artificial para **SandeiApp**. Se conecta a OpenAI para sugerir alineaciones y tácticas, analizar el rendimiento del equipo y predecir resultados de partidos.

## Variables de entorno

Copia `.env.example` a `.env` y completa los siguientes valores:

* `OPENAI_API_KEY` – clave para autenticarte en la API de OpenAI.
* `FASTAPI_HOST` – interfaz donde se iniciará Uvicorn (por defecto `0.0.0.0`).
* `FASTAPI_PORT` – puerto de escucha (por defecto `8000`).
* `ALLOWED_ORIGINS` – **debe ser una lista en formato JSON** (por ejemplo: `["http://localhost:5173","http://localhost:3000"]`).  
  También se acepta texto plano separado por comas (`http://localhost:5173,http://localhost:3000`), pero se recomienda el formato JSON para máxima compatibilidad.
* `API_TOKEN` – token Bearer requerido para llamar a los endpoints.

Estas variables son requeridas tanto al ejecutar en local como con Docker.

Todas las peticiones a los endpoints de `/ia` pueden incluir la cabecera `Authorization` con un token emitido por el backend de NestJS. El ejemplo de código verifica únicamente que la cabecera esté presente, pero se puede ampliar la función `verify_token` para consultar el backend y validar su autenticidad.

## Instalación y pruebas

```bash
cd ia-service
pip install -r requirements.txt
./run_tests.sh
```

Las pruebas utilizan stubs para la API de OpenAI, por lo que pueden ejecutarse sin conexión a internet.

## Uso básico

Ejecuta el servicio en local con:

```bash
uvicorn app.main:app --host $FASTAPI_HOST --port $FASTAPI_PORT
```

O bien construye la imagen Docker:

```bash
docker build -t ia-service .
FASTAPI_HOST=0.0.0.0 FASTAPI_PORT=8000 OPENAI_API_KEY=<clave> \
  docker run -p 8000:8000 ia-service
```

### CORS

El servicio habilita CORS para permitir peticiones desde el frontend y el backend.
Actualmente los orígenes permitidos son:

* `http://localhost:5173` (frontend en desarrollo)
* `http://localhost:3000` (backend NestJS)

### Endpoints principales

* `GET /` – comprobación básica del servicio.
* `POST /ia/suggest_lineup` – sugiere una alineación según la formación enviada.
* `POST /ia/suggest_tactics` – genera instrucciones tácticas para los jugadores.
* `POST /ia/analyze_performance` – analiza las calificaciones de cada jugador.
* `POST /ia/predict_match` – predice el resultado de un partido.
* `POST /ia/detect_errors` – informa de posibles errores en la alineación.
* `GET /healthz` – endpoint de comprobación de salud.

