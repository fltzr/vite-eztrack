import { Outlet } from 'react-router-dom';

export const App = () => {
	console.log(`App re-render`);

	return <Outlet />;
};
