import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/common/router';
import { Loader } from '@/common/components/loader';
import '@cloudscape-design/global-styles/index.css';
import './main.scss';
import { Provider } from 'react-redux';
import { store } from './common/store';

const root = document.querySelector('#root');

if (root) {
    createRoot(root).render(
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} fallbackElement={<Loader />} />
            </Provider>
        </StrictMode>,
    );
}
