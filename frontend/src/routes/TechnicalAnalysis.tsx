import { useState } from 'react';
import { SearchBox } from '../components/SearchBox';

//import types
// import { StockDataType } from '../types/technical-indicators';
// import { LlmInferenceType } from '../types/technical-indicators';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';

//spinner
import { LoadingSpinner } from '../components/loading-spinner';

//font-awesome-imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollarSign,
  faArrowUp,
  faArrowDown,
  faChartBar,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

import { fetchTechnicalIndicator } from '../state/technicalIndicators/technicalAnalysisThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';

export default function TechnicalAnalysis() {
  const [ticker, setTicker] = useState('');
  // const [tickerData, setTickerData] = useState('');
  // const [llamaResponse, setllamaResponse] = useState<LlmInferenceType | null>(
  //   null
  // );
  // const [ollamaNotfound, setOllamaNotfound] = useState(false);

  // const [mistralResponse, setmistralResponse] =
  //   useState<LlmInferenceType | null>(null);

  const technicalIndicatorState = useSelector(
    (state: RootState) => state.technicalIndicator
  );
  const llmInferenceState = useSelector(
    (state: RootState) => state.llmInference
  );
  const dispatch = useDispatch<AppDispatch>();

  const TechnicalData = [
    {
      heading: `${technicalIndicatorState.data?.Ticker} Price Overview`,
      icon: faDollarSign,
      items: [
        {
          label: 'Open',
          value: technicalIndicatorState.data?.Open,
          icon: faDollarSign,
        },
        {
          label: 'Close',
          value: technicalIndicatorState.data?.Close,
          icon: faDollarSign,
        },
        {
          label: 'High',
          value: technicalIndicatorState.data?.High,
          icon: faArrowUp,
        },
        {
          label: 'Low',
          value: technicalIndicatorState.data?.Low,
          icon: faArrowDown,
        },
        {
          label: 'Volume',
          value: technicalIndicatorState.data?.Volume
            ? (technicalIndicatorState.data.Volume / 1000000).toFixed(1) + 'M'
            : '0M',
          icon: faChartBar,
        },
        {
          label: 'Daily Return',
          value: technicalIndicatorState.data?.DailyReturn,
          icon: faChartLine,
        },
      ],
    },
    {
      heading: 'Momentum Indicators',
      icon: faChartLine,
      items: [
        {
          label: 'RSI',
          value: technicalIndicatorState.data?.RSI,
          icon: faChartLine,
        },
        {
          label: 'Stochastic',
          value: technicalIndicatorState.data?.Stochastic,
          icon: faChartLine,
        },
        {
          label: 'Stochastic RSI',
          value: technicalIndicatorState.data?.StochasticRSI,
          icon: faChartLine,
        },
        {
          label: 'MACD Line',
          value: technicalIndicatorState.data?.MACD,
          icon: faChartLine,
        },
        {
          label: 'MACD Signal',
          value: technicalIndicatorState.data?.MACD_Signal,
          icon: faChartLine,
        },
        {
          label: 'MACD Histogram',
          value: technicalIndicatorState.data?.MACD_Diff,
          icon: faChartLine,
        },
        {
          label: 'CCI',
          value: technicalIndicatorState.data?.CCI,
          icon: faChartLine,
        },
        {
          label: 'Ultimate Oscillator',
          value: technicalIndicatorState.data?.UltimateOscillator,
          icon: faChartLine,
        },
        {
          label: 'Williams %R',
          value: technicalIndicatorState.data?.WilliamsR,
          icon: faChartLine,
        },
      ],
    },
    {
      heading: 'Moving Averages',
      icon: faChartLine,
      items: [
        {
          label: 'EMA (12-day)',
          value: technicalIndicatorState.data?.EMA_12,
          icon: faChartLine,
        },
        {
          label: 'EMA (26-day)',
          value: technicalIndicatorState.data?.EMA_26,
          icon: faChartLine,
        },
        {
          label: 'SMA (21-day)',
          value: technicalIndicatorState.data?.SMA_21,
          icon: faChartLine,
        },
        {
          label: 'SMA (50-day)',
          value: technicalIndicatorState.data?.SMA_50,
          icon: faChartLine,
        },
        {
          label: 'SMA (200-day)',
          value: technicalIndicatorState.data?.SMA_200,
          icon: faChartLine,
        },
        {
          label: 'WMA',
          value: technicalIndicatorState.data?.WMA,
          icon: faChartLine,
        },
      ],
    },
    {
      heading: 'Movement Indicators',
      icon: faArrowUp,
      items: [
        {
          label: 'ATR',
          value: technicalIndicatorState.data?.ATR,
          icon: faArrowUp,
        },
        {
          label: 'Ulcer Index',
          value: technicalIndicatorState.data?.UlcerIndex,
          icon: faChartLine,
        },
        {
          label: 'Bollinger Bands High',
          value: technicalIndicatorState.data?.BollingerBands_High,
          icon: faChartLine,
        },
        {
          label: 'Bollinger Bands Low',
          value: technicalIndicatorState.data?.BollingerBands_Low,
          icon: faChartLine,
        },
        {
          label: 'Donchian Channel High',
          value: technicalIndicatorState.data?.DonchianChannel_High,
          icon: faChartLine,
        },
        {
          label: 'Donchian Channel Low',
          value: technicalIndicatorState.data?.DonchianChannel_Low,
          icon: faChartLine,
        },
        {
          label: 'Keltner Channel High',
          value: technicalIndicatorState.data?.KeltnerChannel_High,
          icon: faChartLine,
        },
        {
          label: 'Keltner Channel Low',
          value: technicalIndicatorState.data?.KeltnerChannel_Low,
          icon: faChartLine,
        },
      ],
    },
    {
      heading: 'Volume & Flow Indicators',
      icon: faChartBar,
      items: [
        {
          label: 'OBV',
          value: technicalIndicatorState.data?.OBV,
          icon: faChartBar,
        },
        {
          label: 'ADI',
          value: technicalIndicatorState.data?.ADI,
          icon: faChartBar,
        },
        {
          label: 'CMF',
          value: technicalIndicatorState.data?.CMF,
          icon: faChartBar,
        },
        {
          label: 'Force Index',
          value: technicalIndicatorState.data?.ForceIndex,
          icon: faChartBar,
        },
        {
          label: 'MFI',
          value: technicalIndicatorState.data?.MFI,
          icon: faChartBar,
        },
        {
          label: 'VPT',
          value: technicalIndicatorState.data?.VPT,
          icon: faChartBar,
        },
      ],
    },
    {
      heading: 'Performance Metrics',
      icon: faChartLine,
      items: [
        {
          label: 'Daily Logarithmic Return',
          value: technicalIndicatorState.data?.DailyLogReturn,
          icon: faChartLine,
        },
        {
          label: 'Daily Return',
          value: technicalIndicatorState.data?.DailyReturn,
          icon: faChartLine,
        },
        {
          label: 'Cumulative Return',
          value: technicalIndicatorState.data?.CumulativeReturn,
          icon: faChartLine,
        },
      ],
    },
  ];

  // function parseDataToStockData>Type(data: string): StockDataType | null {
  //   try {
  //     const tech_data = JSON.parse(data);
  //     return tech_data as StockDataType;
  //   } catch (err) {
  //     //need to return better error
  //     throw new Error('Error');
  //   }
  // }

  function handleTickerChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setTicker(event.target.value);
  }
  async function handleEndPoint(event: React.MouseEvent<HTMLButtonElement>) {
    try {
      event.preventDefault();
      // let ollamaFound = true;
      // const response = await fetch(
      //   'http://localhost:8000/api/fectchTicker?ticker=' + ticker
      // );
      // const data = await response.json();
      // setIsLoading(false);
      // const tech_data = parseDataToStockDataType(data.technical_data);

      // const mistral_response = JSON.parse(
      //   data.mistal_response
      // ) as LlmInferenceType;
      const tickerData = {
        ticker: ticker,
      };
      dispatch(fetchTechnicalIndicator(tickerData));
      // if (data.llama_response === 'Ollama not installed') {
      //   setOllamaNotfound(true);
      //   ollamaFound = false;
      // }
      // if (ollamaFound) {
      //   const llama_response = JSON.parse(
      //     data.llama_response
      //   ) as LlmInferenceType;
      //   // setmistralResponse(mistral_response);
      //   setllamaResponse(llama_response);
      // }
      // setStockData(tech_data);
    } catch (error) {
      throw new Error();
    }
  }
  return (
    <div>
      <SearchBox
        handleInputChange={handleTickerChange}
        handleButtonClick={handleEndPoint}
      />
      {/* if its desktop I want them to be side by side else stacked */}
      <div>
        {technicalIndicatorState.status === 'idle' && (
          <div className="mt-10 flex justify-center items-center">
            <p>Search for a stock</p>
          </div>
        )}
        {technicalIndicatorState.status === 'loading' && (
          <div className="mt-10 flex justify-center items-center">
            <LoadingSpinner className="text-neutral-950 dark:text-neutral-50" />
          </div>
        )}

        {technicalIndicatorState.status === 'succeeded' && (
          <div>
            <div className="flex flex-col p-14 md:p-0 md:flex-row flex-wrap gap-3 justify-evenly mt-10">
              {TechnicalData.map((tech_data) => (
                <Card className="w-full md:w-2/5">
                  <CardHeader>
                    <CardTitle>
                      <FontAwesomeIcon icon={tech_data.icon} />{' '}
                      {tech_data.heading}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {tech_data.items.map((item) => (
                        <div className="p-2">
                          <div className="text-sm text-gray-500">
                            {item.label}
                          </div>
                          <div className="text-lg font-semibold">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 mx-14">
              <div className="text-2xl font-bold mb-2 dark:text-white">
                LLM Recommendations
              </div>
              {llmInferenceState.data?.map((item) => (
                <Card className="flex flex-col mt-4">
                  <CardHeader>
                    <CardTitle>
                      <div className="font-bold mb-2">{item.name}</div>{' '}
                      <div>{item.recommendation}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{item.reasoning}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
