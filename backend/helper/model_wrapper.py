from langchain_ollama import ChatOllama
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq


class ModelFactory:
    @staticmethod
    def create_model(model_name, temperature):
        if model_name == "mistral":
            return ChatOllama(model=model_name, temperature=temperature)
        elif model_name == "llama3.2":
            return ChatOllama(model=model_name, temperature=temperature)
        elif model_name == "gemini-1.5-pro":
            return ChatGoogleGenerativeAI(
                model="gemini-1.5-pro", temperature=temperature
            )
        elif model_name == "llama-3.1-70b-versatile":
            return ChatGroq(model=model_name, temperature=temperature)
        else:
            raise ValueError("Model name not found", 400)


async def get_response(prompt, model_name, temperature=0):
    llm = ModelFactory.create_model(model_name, temperature)
    llm_response = await llm.ainvoke(prompt)
    return llm_response
