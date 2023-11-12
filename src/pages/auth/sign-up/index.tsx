import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    Container,
    Grid,
    Header,
    SpaceBetween,
} from '@cloudscape-design/components';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { SignupForm } from '@/common/components/signup-form';
import { signup } from '@/features/auth/slice';
import { InferredSignupSchema } from '@/features/auth/types';
import { selectSignupError, selectIsAuthenticated } from '@/features/auth/selectors';
import styles from './styles.module.scss';
import { Divider } from '@/common/components/divider';

// Define action types as constants
const SET_NAVIGATION_HIDDEN = 'layout/setNavigationHidden';
const SET_TOOLS_HIDDEN = 'layout/setToolsHidden';

export const Component = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const serverError = useAppSelector(selectSignupError);

    useEffect(() => {
        dispatch({ type: SET_NAVIGATION_HIDDEN, payload: true });
        dispatch({ type: SET_TOOLS_HIDDEN, payload: true });
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        console.log(`serverError: `, serverError);
    }, [serverError]);

    const handleSubmitSignup = async (data: InferredSignupSchema) => {
        console.log(`[Auth] Sign-up: `, data);
        dispatch(signup(data));
    };

    return (
        <div className={styles['signup-form']}>
            <Container
                header={
                    <Header variant="h1" description="It's quick and easy.">
                        Sign up
                    </Header>
                }
            >
                <SpaceBetween size="m">
                    <SignupForm handleSubmitSignup={handleSubmitSignup} />
                    <Divider>Have an eztrack account?</Divider>
                    <Grid
                        gridDefinition={[{ colspan: 2 }, { colspan: 8 }, { colspan: 2 }]}
                    >
                        <div></div>
                        <Button
                            fullWidth
                            variant="normal"
                            wrapText={false}
                            formAction="none"
                            onClick={(event) => {
                                event.preventDefault();
                                navigate('/auth/signin');
                            }}
                        >
                            Sign in
                        </Button>
                        <div></div>
                    </Grid>
                </SpaceBetween>
            </Container>
        </div>
    );
};
