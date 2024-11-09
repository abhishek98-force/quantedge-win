from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import random
import logging

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/api/healthz")
def get_trivia():
    return {'name':'healthy'}

@app.get("/api/fetchTicker")
def get_ticker_details(ticker: str):
    return "hello world, this is the ticker details for " + ticker

# app.mount("/", StaticFiles(directory="../gui", html=True), name="static")
