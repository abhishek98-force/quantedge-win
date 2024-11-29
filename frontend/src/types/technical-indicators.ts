interface PriceData {
  Open: number;
  High: number;
  Low: number;
  Close: number;
  'Adj Close': number;
  Volume: number;
}

interface MovementIndicators {
  ATR: number;
  UlcerIndex: number;
  BollingerBands_High: number;
  BollingerBands_Low: number;
  DonchianChannel_High: number;
  DonchianChannel_Low: number;
  KeltnerChannel_High: number;
  KeltnerChannel_Low: number;
}

interface MovingAverages {
  EMA_12: number;
  EMA_26: number;
  SMA_21: number;
  SMA_50: number;
  SMA_200: number;
  WMA: number;
}

interface Oscillators {
  RSI: number;
  Stochastic: number;
  StochasticRSI: number;
  MACD: number;
  MACD_Signal: number;
  MACD_Diff: number;
  CCI: number;
  UltimateOscillator: number;
  WilliamsR: number;
}

interface VolumeFlowIndicators {
  OBV: number;
  ADI: number;
  CMF: number;
  ForceIndex: number;
  MFI: number;
  VPT: number;
}

interface TrendIndicators {
  AO: number;
  DPRO: number;
  PPO: number;
  MASS: number;
}

interface PerformanceMetrics {
  DailyLogReturn: number;
  DailyReturn: number;
  CumulativeReturn: number;
}

interface StockMetadata {
  Ticker: string;
}

export type StockDataType = StockMetadata &
  PriceData &
  MovementIndicators &
  MovingAverages &
  VolumeFlowIndicators &
  TrendIndicators &
  Oscillators &
  PerformanceMetrics &
  StockMetadata;

export type LlmInferenceType = {
  name: string;
  recommendation: string;
  reasoning: string;
};
