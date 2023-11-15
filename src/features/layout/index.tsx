import { Shell } from './components/shell';
import { PropsWithChildren, useEffect } from 'react';
import { Header } from './components/header';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { selectDensity, selectTheme } from './selectors';
import { applyDensity, applyMode } from '@cloudscape-design/global-styles';

export const Layout = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const density = useAppSelector(selectDensity);

    useEffect(() => {
        applyMode(theme);
        applyDensity(density);
    }, [dispatch, theme, density]);

    return (
        <>
            <Header />
            <Shell children={children} />
        </>
    );
};
