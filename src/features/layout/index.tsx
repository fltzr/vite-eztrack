import type { PropsWithChildren } from 'react';
import { Header } from './components/header';
import { Shell } from './components/shell';
import { useLayoutHooks } from './hooks/use-layout-hooks';

export const Layout = ({ children }: PropsWithChildren) => {
	useLayoutHooks();

	return (
		<>
			<Header />
			<Shell>{children}</Shell>
		</>
	);
};
