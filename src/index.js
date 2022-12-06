import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// PWA 추가
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register();

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </CookiesProvider>
);

reportWebVitals();
