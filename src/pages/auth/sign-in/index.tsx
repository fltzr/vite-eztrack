import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Header, SpaceBetween } from '@cloudscape-design/components';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { SigninForm } from '@/common/components/signin-form';
import { CreateAccountButton } from '@/common/components/create-account-button';
import { signin } from '@/features/auth/slice';
import { selectIsAuthenticated } from '@/features/auth/selectors';

import styles from './styles.module.scss';
import { InferredSigninSchema } from '@/features/auth/types';
import { Divider } from '@/common/components/divider';

const SET_NAVIGATION_HIDDEN = 'layout/setNavigationHidden';
const SET_TOOLS_HIDDEN = 'layout/setToolsHidden';

export const Component = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

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
        <div className={styles['auth-form']}>
            <Container header={<Header variant="h1">Sign in</Header>}>
                <SpaceBetween size="xxl" direction="vertical">
                    <SigninForm handleSignin={handleSubmitLogin} />
                    <Divider>New to eztrack?</Divider>
                    <CreateAccountButton />
                </SpaceBetween>
            </Container>
        </div>
    );
};
