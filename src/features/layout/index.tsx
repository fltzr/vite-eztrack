import type { PropsWithChildren } from 'react';
import { Header } from './components/header';
import { Shell } from './components/shell';
import { useActiveHref } from './hooks/useActiveHref';
import { useRouteTitle } from './hooks/useRouteTitle';

export const Layout = ({ children }: PropsWithChildren) => {
	useRouteTitle();
	useActiveHref();

	return (
		<>
			<Header />
			<Shell>{children}</Shell>
		</>
	);
};
