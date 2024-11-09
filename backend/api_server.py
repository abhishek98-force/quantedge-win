from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import random
import logging
import yfinance as yf
import os


from datetime import datetime, timedelta
import ta
import json

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

@app.get("/api/fectchTicker")
def get_ticker_details(ticker: str):
    tech_data = perform_technical_analysis(ticker)
    json_tech_data = json.dumps(tech_data)
    return {'technical_data': json_tech_data}

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

if os.getenv("RUNNING_IN_DOCKER"):
    app.mount("/", StaticFiles(directory="/app/dist", html=True), name="static")
