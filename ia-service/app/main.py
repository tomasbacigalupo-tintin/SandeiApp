from fastapi import FastAPI, status

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI"}

@app.post("/ia/suggest_lineup", status_code=status.HTTP_501_NOT_IMPLEMENTED)
async def suggest_lineup():
    return {"detail": "Not implemented"}

@app.post("/ia/analyze_performance", status_code=status.HTTP_501_NOT_IMPLEMENTED)
async def analyze_performance():
    return {"detail": "Not implemented"}
