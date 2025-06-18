FROM python:3.9-slim

WORKDIR /app

# Copia requirements y lo instala
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el contenido del proyecto (incluyendo app/, .env, etc.)
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
