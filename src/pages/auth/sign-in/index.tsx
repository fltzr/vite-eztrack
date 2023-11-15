import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { SigninForm } from '@/common/components/signin-form';
import { CreateAccountButton } from '@/common/components/create-account-button';
import { signin } from '@/features/auth/slice';
import { selectIsAuthenticated } from '@/features/auth/selectors';

import styles from './styles.module.scss';
import { InferredSigninSchema } from '@/features/auth/types';
import { Divider } from '@/common/components/divider';
import Button from '@cloudscape-design/components/button';
import { selectDensity, selectTheme } from '@/features/layout/selectors';
import { Mode, applyMode } from '@cloudscape-design/global-styles';
import { changeTheme, setTheme } from '@/features/layout/slice';

const SET_NAVIGATION_HIDDEN = 'layout/setNavigationHidden';
const SET_TOOLS_HIDDEN = 'layout/setToolsHidden';

export const Component = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    const theme = useAppSelector(selectTheme);
    const density = useAppSelector(selectDensity);

    useEffect(() => {
        dispatch({ type: SET_NAVIGATION_HIDDEN, payload: true });
        dispatch({ type: SET_TOOLS_HIDDEN, payload: true });
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmitLogin = async (data: InferredSigninSchema) => {
        console.log(`[Auth] Sign-in: `, data);
        dispatch(signin(data));
    };

    return (
        <>
            <div className={styles['auth-form']}>
                <SpaceBetween size="xxl" direction="vertical">
                    <Container header={<Header variant="h1">Sign in</Header>}>
                        <SpaceBetween size="xxl" direction="vertical">
                            <SigninForm handleSignin={handleSubmitLogin} />
                            <Divider>New to eztrack?</Divider>
                            <CreateAccountButton />
                        </SpaceBetween>
                    </Container>
                    <Button
                        variant="primary"
                        iconName={
                            theme === Mode.Light ? 'status-positive' : 'status-negative'
                        }
                        onClick={() => {
                            if (theme === Mode.Light) {
                                dispatch(changeTheme(Mode.Dark));
                            } else {
                                dispatch(changeTheme(Mode.Light));
                            }
                        }}
                    >
                        Theme
                    </Button>
                </SpaceBetween>
            </div>
        </>
    );
};
