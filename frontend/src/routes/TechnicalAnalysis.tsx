import { useState } from 'react';
import { SearchBox } from '../components/SearchBox';

//import types
import { StockDataType } from '../types/technical-indicators';
import { LlmInferenceType } from '../types/technical-indicators';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';

import { Separator } from '../components/ui/separator';

//spinner
import { LoadingSpinner } from '../components/loading-spinner';

//font-awesome-imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';

export default function TechnicalAnalysis() {
  const [ticker, setTicker] = useState('');
  const [dispTicker, setDispTicker] = useState('');
  // const [tickerData, setTickerData] = useState('');
  const [stockData, setStockData] = useState<StockDataType | null>(null);
  const [llamaResponse, setllamaResponse] = useState<LlmInferenceType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [mistralResponse, setmistralResponse] =
  //   useState<LlmInferenceType | null>(null);
  function parseDataToStockDataType(data: string): StockDataType | null {
    try {
      const tech_data = JSON.parse(data);
      return tech_data as StockDataType;
    } catch (err) {
      //need to return better error
      throw new Error('Error');
    }
  }

  function handleTickerChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setTicker(event.target.value);
  }
  async function handleEndPoint() {
    try {
      setIsLoading(true);
      setDispTicker(ticker);
      const response = await fetch(
        'http://localhost:8000/api/fectchTicker?ticker=' + ticker
      );
      const data = await response.json();
      setIsLoading(false);
      const tech_data = parseDataToStockDataType(data.technical_data);
      // const mistral_response = JSON.parse(
      //   data.mistal_response
      // ) as LlmInferenceType;
      const llama_response = JSON.parse(
        data.llama_response
      ) as LlmInferenceType;
      // setmistralResponse(mistral_response);
      setllamaResponse(llama_response);
      setStockData(tech_data);
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
      {isLoading ? (
        <div className="mt-10 flex justify-center items-center">
          <LoadingSpinner className="dark: text-neutral-50" />
        </div>
      ) : (
        stockData && (
          <div>
            <div className="flex flex-col md:flex-row gap-2 mt-10 p-2 flex-1">
              <Card className="w-full md:w-1/2">
                <CardHeader>
                  <CardTitle>
                    <FontAwesomeIcon icon={faDollarSign} />{' '}
                    {`${dispTicker} Price Overview`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-2">
                      <div className="text-sm text-gray-500">Open</div>
                      <div className="text-lg font-semibold">
                        ${stockData.Open}
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="text-sm text-gray-500">Close</div>
                      <div className="text-lg font-semibold">
                        ${stockData.Close}
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="text-sm text-gray-500">High</div>
                      <div className="text-lg font-semibold">
                        ${stockData.High}
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="text-sm text-gray-500">Low</div>
                      <div className="text-lg font-semibold">
                        ${stockData.Low}
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="text-sm text-gray-500">Volume</div>
                      <div className="text-lg font-semibold">
                        {(stockData.Volume / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="text-sm text-gray-500">Daily Return</div>
                      {/* <div
                    className={`text-lg font-semibold flex items-center gap-1 ${
                      isPositive(stockData.DailyReturn)
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {isPositive(stockData.DailyReturn) ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stockData.DailyReturn)}%
                  </div> */}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full md:w-1/2">
                <CardHeader>
                  <CardTitle>
                    <FontAwesomeIcon icon={faBoltLightning} />{' '}
                    {`Momentum Indicators`}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="mt-10">
              <div className="text-4xl dark:text-neutral-50">{`LLM Results`}</div>
              <div className="flex flex-col gap-4 mt-5">
                <Card className="w-full p-2">
                  <div className="flex flex-row">
                    <CardHeader className="w-1/3">
                      <CardTitle>
                        <FontAwesomeIcon icon={faBoltLightning} /> {`Mistral`}
                      </CardTitle>
                    </CardHeader>
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <CardContent className="w-2/3">
                      <div className="text-2xl p-2">
                        {llamaResponse?.recommendation}
                      </div>
                      <div className="p-2">{llamaResponse?.reasoning}</div>
                    </CardContent>
                  </div>
                </Card>
                <Card className="w-full">
                  <div className="flex flex-row">
                    <CardHeader className="w-1/3">
                      <CardTitle>
                        <FontAwesomeIcon icon={faBoltLightning} /> {`Mistral`}
                      </CardTitle>
                    </CardHeader>
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <CardContent className="w-2/3">
                      {/* <div>{mistralResponse?.reasoning}</div>
                    <div>{mistralResponse?.recommendation}</div> */}
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )
      )}

      {/* <div className="text-black dark:text-white">{stockData}</div> */}
    </div>
  );
}
