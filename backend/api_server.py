from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

@app.get("/api/trivia")
def get_trivia():
    random.seed()
    trivia_list = [
        "Did you know? The Eiffel Tower can be 15 cm taller during the summer.",
        "Did you know? Honey never spoils.",
        "Did you know? A day on Venus is longer than a year on Venus.",
        "Did you know? Bananas are berries, but strawberries aren't.",
        "Did you know? There are more stars in the universe than grains of sand on Earth."
    ]
    random_trivia = random.choice(trivia_list)
    logger.info(f"Selected trivia: {random_trivia}")
    return {"trivia": random_trivia}