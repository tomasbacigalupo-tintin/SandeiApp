FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app app
EXPOSE ${FASTAPI_PORT}
CMD ["uvicorn", "app.main:app", "--host", "${FASTAPI_HOST}", "--port", "${FASTAPI_PORT}"]
