import { Shell } from './components/shell';
import { PropsWithChildren } from 'react';
import { Header } from './components/header';

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Header />
			<Shell children={children} />
		</>
	);
};
