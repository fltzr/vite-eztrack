import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Loader } from '@/common/components/loader';
import { router } from '@/common/router';
import { store } from './common/store';
import '@cloudscape-design/global-styles/index.css';
import './main.scss';

const root = document.querySelector('#c');

if (root) {
	createRoot(root).render(
		<StrictMode>
			<Provider store={store}>
				<RouterProvider router={router} fallbackElement={<Loader />} />
			</Provider>
		</StrictMode>,
	);
}
