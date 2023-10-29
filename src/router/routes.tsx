import { RouteObject } from 'react-router-dom';
import { AppContainer } from '../app-container';

export const routes: RouteObject[] = [
	{
		path: '/',
		index: true,
		element: <AppContainer />,
	},
];
