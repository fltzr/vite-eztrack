import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { Loader } from '@/common/components/loader';
import '@cloudscape-design/global-styles/index.css';
import './main.scss';

const root = document.querySelector('#root');

if (root) {
	createRoot(root).render(
		<StrictMode>
			<RouterProvider router={router} fallbackElement={<Loader />} />
		</StrictMode>,
	);
}
