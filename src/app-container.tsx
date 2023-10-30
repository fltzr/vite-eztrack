import { Provider } from 'react-redux';
import { store } from '@/common/store';
import { App } from './app';
import { Layout } from '@/features/layout';

export const AppContainer = () => {
	return (
		<Provider store={store}>
			<Layout>
				<App />
			</Layout>
		</Provider>
	);
};
