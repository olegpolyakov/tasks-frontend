/// <reference types="@olegpolyakov/frontend" />

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import http from '@olegpolyakov/frontend/clients/http';

import App from './app';
import { API_URL } from './env';

import './index.scss';

http.setBaseUrl(API_URL);

createRoot(document.getElementById('root')!).render(
    <Router>
        <App />
    </Router>
);