import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { SWRConfig } from 'swr';
import { fetcher } from './Api/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <ConfigProvider locale={ruRU}>
            <BrowserRouter>
                <SWRConfig value={{fetcher}}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </SWRConfig>
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>
);
