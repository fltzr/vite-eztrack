import { PropsWithChildren } from 'react';
import { Header } from './components/header';
import { Shell } from './components/shell';
import { useRouteTitle } from './hooks/useRouteTitle';
import { useActiveHref } from './hooks/useActiveHref';

export const Layout = ({ children }: PropsWithChildren) => {
    useRouteTitle();
    useActiveHref();

    return (
        <>
            <Header />
            <Shell children={children} />
        </>
    );
};
