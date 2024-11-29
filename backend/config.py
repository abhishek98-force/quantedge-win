from typing import List

from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv

from helper.model_wrapper import get_response

load_dotenv()


class CommonSettings(BaseSettings):

    debug: bool = Field(False, env="DEBUG")

    def get_llm_respone(self, model_name, temperature=0):
        response = get_response(model_name, temperature)
        return response

    class Config:
        env_file = ".env"  # Default env file
        env_file_encoding = "utf-8"


class LocalSettings(CommonSettings):
    debug: bool = True  # Override for local
    models: List[str] = ["mistral", "llama3.2"]

    class Config:
        env_file = ".env"  # Specify local .env file


class ProductionSettings(CommonSettings):
    debug: bool = False  # Override for production
    groq_api_key: str
    google_api_key: str
    models: List[str] = ["gemini-1.5-pro", "llama-3.1-70b-versatile"]

    class Config:
        env_file = ".env.prod"  # Specify production .env file
