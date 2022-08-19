import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.scss';
import App from './App';
import {store} from './store'
import {Provider as StoreProvider} from 'react-redux'

createRoot(document.getElementById('root')!).render(
    <StoreProvider store={store}>
        <App/>
    </StoreProvider>,
)
