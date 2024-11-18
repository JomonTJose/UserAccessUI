import { Field, Form, Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store";
import { clearError, login } from "../features/auth/authActions";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Paper, Snackbar } from '@mui/material';
import { loginValidationSchema } from "../schema/loginSchema";

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const { error, loading, userToken } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(clearError());
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            setOpen(true);
        }
    }, [error]);


    const handleLogin = async (
        values: { email: string; password: string },
        { setSubmitting }: FormikHelpers<{ email: string; password: string }>
    ) => {
        try {
            await dispatch(login(values)).unwrap();
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            console.error('Login failed:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(clearError());
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
        >
            {({ errors, touched, isSubmitting }) => (
                <Container maxWidth="sm">
                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={error}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    />
                    <Box sx={{ mt: 8, mb: 4 }}>
                        <Paper elevation={3} sx={{ p: 4 }}>
                            <Typography variant="h4" component="h1" gutterBottom align="center">
                                Login
                            </Typography>
                            <Form>
                                <Box sx={{ mb: 2 }}>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        helperText={touched.email && errors.email}
                                        error={touched.email && Boolean(errors.email)}
                                    />
                                </Box>
                                <Box sx={{ mb: 3 }}>
                                    <Field
                                        name="password"
                                        as={TextField}
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        helperText={touched.password && errors.password}
                                        error={touched.password && Boolean(errors.password)}
                                    />
                                </Box>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{ mt: 1 }}
                                    disabled={isSubmitting || loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <Typography variant="body2">
                                        Don't have an account?{' '}
                                        <Link to="/register" style={{ textDecoration: 'none', color: 'primary.main' }}>
                                            Register
                                        </Link>
                                    </Typography>
                                </Box>
                            </Form>
                        </Paper>
                    </Box>
                </Container>
            )}
        </Formik>
    );
}
