import React from 'react';
import ReactDOM from 'react-dom/client';
// import ErrorPage from './error-page';
import TechnicalAnalysis from './routes/TechnicalAnalysis';
import FundamentalAnalysis from './routes/FundamentalAnalysis';
import SentimentAnalysis from './routes/SentimentAnalysis';
// import ErrorBoundary from './ErrorBoundary';
import Prompts from './routes/Prompts';
import Home from './routes/Home';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Root from './routes/root';
import './index.css';

//react-redux inports
import { store } from './state/store';
import { Provider } from 'react-redux';

declare global {
  interface Window {
    pywebview: {
      api: {
        [key: string]: (...args: unknown[]) => Promise<unknown>;
      };
      [key: string]: unknown;
    };
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="home" element={<Home />} />
            <Route path="technical-analysis" element={<TechnicalAnalysis />} />
            <Route
              path="fundamental-analysis"
              element={<FundamentalAnalysis />}
            />
            <Route path="sentiment-analysis" element={<SentimentAnalysis />} />
            <Route path="prompts" element={<Prompts />} />
          </Route>
        </Routes>
      </HashRouter>
      {/* <RouterProvider router={router} /> */}
      {/* <Root /> */}
    </React.StrictMode>
  </Provider>
);
