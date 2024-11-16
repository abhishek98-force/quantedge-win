from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import random
import logging
import yfinance as yf
import os
import re

from datetime import datetime, timedelta
import ta
import json

# llm models 
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import ChatOllama

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

strategy_json = {
  "strategies": [
    {
      "strategy": "LT112",
      "description": "Optimized for stable markets with a 50-wide protective PDS, balancing premium collection with risk management.",
      "whenToUse": "Normal to slightly bullish markets.",
      "nakedPutsDelta": "2x at 5-7 Delta",
      "pdsLongPutDelta": "25 (variable)",
      "pdsWidth": "25-50",
      "pdsNPRCostRatio": "1:3",
      "technicalIndicators": "12-day EMA above 26-day EMA; Price above 50-day SMA, indicating immediate bullish momentum and a strong short to medium-term uptrend."
    },
    {
      "strategy": "BA112",
      "description": "Aimed at longer, deeper sell-offs with a defensive stance by positioning naked puts further OTM (lower delta), widening the width of the trap and collecting less overall premium due to NPs being further OTM.",
      "whenToUse": "Expecting a serious market correction rather than a shorter pull back.",
      "nakedPutsDelta": "2x at 3-5 Delta",
      "pdsLongPutDelta": "25",
      "pdsWidth": "50 (or smaller)",
      "pdsNPRCostRatio": "1:1",
      "technicalIndicators": "26-day EMA below 12-day EMA and approaching 50-day SMA from above; RSI > 75, indicating potential overextension and readiness for a correction."
    },
    {
      "strategy": "FB112",
      "description": "Optimized for smaller market pullbacks, involves setting up a fatter PDS trap to sweeten the profits on a pullback. Generally, means a trap >50 points wide",
      "whenToUse": "Good strategy when fundamentals are strong but the market is overbought, indicating a short-term correction may be warranted.",
      "nakedPutsDelta": "2x at 5-6 Delta",
      "pdsLongPutDelta": "25-50",
      "pdsWidth": "50-100",
      "pdsNPRCostRatio": "1:2",
      "technicalIndicators": "12-day EMA significantly above 26-day EMA; Price touches or exceeds upper Bollinger Band, RSI > 70, signaling overbought conditions ripe for a pullback."
    },
    {
      "strategy": "111",
      "description": "A variant of FB112 focusing on overbought markets, where the credit from a single Naked Put is used exclusively to finance the PDS, aiming for minimal risk exposure.",
      "whenToUse": "Overbought markets, fully leveraging NP credit for PDS, to minimize risk.",
      "nakedPutsDelta": "1x at 5-6 Delta",
      "pdsLongPutDelta": "Not specified",
      "pdsWidth": "50-100",
      "pdsNPRCostRatio": "1:1",
      "technicalIndicators": "Similar to FB112: 12-day EMA above 26-day EMA during clear overbought conditions; Price approaches or touches upper Bollinger Band, further confirmed by RSI > 70."
    }
  ]
}

template = """Question: {question}

Answer: Let's think step by step."""
ollama_installed = False
#Logic to check if OLlAMA is installed or not , if not avaible handle it
try:
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_ollama import ChatOllama
    ollama_installed = True
except ImportError:
    ollama_installed = False
    print("Warning: langchain_ollama is not installed. Some features may not be available.")

@app.get("/api/healthz")
def get_trivia():
    return {'name':'healthy'}

@app.get("/api/fectchTicker")
def get_ticker_details(ticker: str):
    tech_data = perform_technical_analysis(ticker)
    json_tech_data = json.dumps(tech_data)
    prepared_prompt = construct_prompt(ticker, tech_data)
    # mistral_response = get_mistral_response(prepared_prompt)
    print(ollama_installed)
    if ollama_installed:
      llama_response = get_llama_response(prepared_prompt)

      # print(mistral_response)
      print(llama_response.content)
      llama_response_json = llama_response.content
      json_part_match = re.search(r'\{.*?\}', llama_response_json, flags=re.DOTALL)
      result_json_str = ""
      if json_part_match:
          json_part = json_part_match.group(0)
          data = json.loads(json_part)
          # Construct the result JSON string with only the required fields
          result_json_str = json.dumps({"recommendation": data["recommendation"], "reasoning": data["reasoning"]})
          print(result_json_str)
      else:
          print("No valid JSON found in content.")
    else:
      result_json_str = "Ollama not installed"
      print({'technical_data': json_tech_data,
          # 'mistral_response': mistral_response,
          'llama_response': result_json_str})
      # mistral_response = json.loads(mistral_response.content)
    return {'technical_data': json_tech_data,
          # 'mistral_response': mistral_response,
          'llama_response': result_json_str}

def get_mistral_response(prompt):
    llm = ChatOllama(model="mistral", temperature=0)
    mistral_respone = llm.invoke(prompt)
    return mistral_respone

def get_llama_response(prompt):
    llm = ChatOllama(model="llama3.2", temperature=0)
    llama_response = llm.invoke(prompt)
    return llama_response

def perform_technical_analysis(ticker):
    # Calculate the date range for the last one year
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)

    # Fetch the stock data
    stock_data = yf.download(ticker, start=start_date, end=end_date)

    # Initialize the ta library with the stock data
    # Add all available indicators to the dataframe
    # print(stock_data['High'])

    # return "hello"

    # Trend Indicators
    stock_data['ADX'] = ta.trend.adx(stock_data['High'], stock_data['Low'], stock_data['Close'])
    stock_data['CCI'] = ta.trend.cci(stock_data['High'], stock_data['Low'], stock_data['Close'])
    stock_data['DPO'] = ta.trend.dpo(stock_data['Close'])
    stock_data['EMA_12'] = ta.trend.ema_indicator(stock_data['Close'], window=12)
    stock_data['EMA_26'] = ta.trend.ema_indicator(stock_data['Close'], window=26)
    stock_data['MACD'] = ta.trend.macd(stock_data['Close'])
    stock_data['MACD_Signal'] = ta.trend.macd_signal(stock_data['Close'])
    stock_data['MACD_Diff'] = ta.trend.macd_diff(stock_data['Close'])
    stock_data['MASS'] = ta.trend.mass_index(stock_data['High'], stock_data['Low'])
    stock_data['SMA_21'] = ta.trend.sma_indicator(stock_data['Close'], window=21)
    stock_data['SMA_50'] = ta.trend.sma_indicator(stock_data['Close'], window=50)
    stock_data['SMA_200'] = ta.trend.sma_indicator(stock_data['Close'], window=200)
    stock_data['WMA'] = ta.trend.wma_indicator(stock_data['Close'], window=30)

    # Momentum Indicators
    stock_data['AO'] = ta.momentum.awesome_oscillator(stock_data['High'], stock_data['Low'])
    stock_data['PPO'] = ta.momentum.ppo(stock_data['Close'])
    stock_data['RSI'] = ta.momentum.rsi(stock_data['Close'])
    stock_data['Stochastic'] = ta.momentum.stoch(stock_data['High'], stock_data['Low'], stock_data['Close'])
    stock_data['StochasticRSI'] = ta.momentum.stochrsi(stock_data['Close'])
    stock_data['UltimateOscillator'] = ta.momentum.ultimate_oscillator(stock_data['High'], stock_data['Low'], stock_data['Close'])
    stock_data['WilliamsR'] = ta.momentum.williams_r(stock_data['High'], stock_data['Low'], stock_data['Close'])

    # Volume Indicators
    stock_data['ADI'] = ta.volume.acc_dist_index(stock_data['High'], stock_data['Low'], stock_data['Close'], stock_data['Volume'])
    stock_data['OBV'] = ta.volume.on_balance_volume(stock_data['Close'], stock_data['Volume'])
    stock_data['CMF'] = ta.volume.chaikin_money_flow(stock_data['High'], stock_data['Low'], stock_data['Close'], stock_data['Volume'])
    stock_data['EOM'] = ta.volume.ease_of_movement(stock_data['High'], stock_data['Low'], stock_data['Close'], stock_data['Volume'])
    stock_data['ForceIndex'] = ta.volume.force_index(stock_data['Close'], stock_data['Volume'])
    stock_data['MFI'] = ta.volume.money_flow_index(stock_data['High'], stock_data['Low'], stock_data['Close'], stock_data['Volume'])
    stock_data['NVI'] = ta.volume.negative_volume_index(stock_data['Close'], stock_data['Volume'])
    stock_data['VPT'] = ta.volume.volume_price_trend(stock_data['Close'], stock_data['Volume'])

    # Volatility Indicators
    stock_data['ATR'] = ta.volatility.average_true_range(stock_data['High'], stock_data['Low'], stock_data['Close'])
    stock_data['BollingerBands_High'] = ta.volatility.bollinger_hband(stock_data['Close'])
    stock_data['BollingerBands_Low'] = ta.volatility.bollinger_lband(stock_data['Close'])
    stock_data['DonchianChannel_High'] = ta.volatility.donchian_channel_hband(stock_data['High'], stock_data['Low'], stock_data['Close'])
    stock_data['DonchianChannel_Low'] = ta.volatility.donchian_channel_lband(stock_data['High'], stock_data['Low'], stock_data['Close'])
    stock_data['KeltnerChannel_High'] = ta.volatility.keltner_channel_hband(stock_data['High'], stock_data['Low'], stock_data['Close'])
    stock_data['KeltnerChannel_Low'] = ta.volatility.keltner_channel_lband(stock_data['High'], stock_data['Low'], stock_data['Close'])
    stock_data['UlcerIndex'] = ta.volatility.ulcer_index(stock_data['Close'])

    # Other Indicators
    stock_data['DailyLogReturn'] = ta.others.daily_log_return(stock_data['Close'])
    stock_data['DailyReturn'] = ta.others.daily_return(stock_data['Close'])
    stock_data['CumulativeReturn'] = ta.others.cumulative_return(stock_data['Close'])

    # Trim the values in stock_data to 2 decimals
    stock_data = stock_data.round(2)

    # Get the most recent day's indicators
    latest_data = stock_data.iloc[-1].to_dict()

    # Add Ticker and Date to the JSON
    latest_data['Ticker'] = ticker
    latest_data['Date'] = stock_data.index[-1].strftime('%Y-%m-%d')

    return latest_data

def construct_prompt(ticker, ta_json):

    sample_json = """
        {
        "recommendation": "LT112",
        "reasoning": "Explanation for why LT112 is recommended based on the analysis."
    }
    """

    strategy_prompt = f"""
    You are a financial analyst. Your task is to review the technical indicators for {ticker}
    represented as {ta_json} and use the strategies defined in : {strategy_json}
    and make a recommendation for the best strategy to use and the reason for your recommendation.
    Your response should be a simple json like this 
    {sample_json}
    """

    messages = [
        (
            "system",
            "You are a financial analyst.",
        ),
        ("human", strategy_prompt),
    ]

    return messages

if os.getenv("RUNNING_IN_DOCKER"):
    app.mount("/", StaticFiles(directory="/app/dist", html=True), name="static")
