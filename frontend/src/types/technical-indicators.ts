interface PriceData {
  Open: number;
  High: number;
  Low: number;
  Close: number;
  'Adj Close': number;
  Volume: number;
}

interface TechnicalIndicators {
  ADX: number;
  CCI: number;
  // ... other technical indicators
}

interface VolumeIndicators {
  ADI: number;
  OBV: number;
  // ... other volume indicators
}

interface StockMetadata {
  Ticker: string;
  Date: string;
}

export type StockDataType = PriceData &
  TechnicalIndicators &
  VolumeIndicators &
  StockMetadata;

export type LlmInferenceType = {
  recommendation: string;
  reasoning: string;
};
