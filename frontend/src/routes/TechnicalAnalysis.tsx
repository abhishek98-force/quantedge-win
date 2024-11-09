import { useState } from 'react';
export default function TechnicalAnalysis() {
  const [ticker, setTicker] = useState('');
  const [tickerData, setTickerData] = useState('');
  async function handleEndPoint() {
    try {
      const response = await fetch(
        'http://localhost:8000/api/fectchTicker?ticker=' + ticker
      );
      const data = await response.json();

      setTickerData(data.technical_data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter ticker symbol"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />
      <button onClick={handleEndPoint}>Go!!</button>
      <div>{tickerData}</div>
    </div>
  );
}
