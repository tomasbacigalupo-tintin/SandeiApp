from fastapi import FastAPI, HTTPException, status

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI"}


@app.post("/ia/suggest_lineup")
async def suggest_lineup():
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)


@app.post("/ia/analyze_performance")
async def analyze_performance():
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
