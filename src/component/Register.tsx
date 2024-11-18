import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { register } from "../features/auth/authActions";
import { AppDispatch, RootState } from "../store";
import { Container, Box, Paper, Typography, TextField, Button, Alert, Snackbar } from "@mui/material";
import { registerValidationSchema } from "../schema/registerSchema";


export default function Register() {
    const dispatch = useDispatch<AppDispatch>();
    const { error, loading, userToken } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (userToken) {
            navigate('/');
        }
    }, [userToken]);

    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    

    const handleRegister = async (
        values: { email: string; name: string; password: string },
        { setSubmitting }: FormikHelpers<{ email: string; name: string; password: string }>
    ) => {
        try {
            await dispatch(register(values)).unwrap();
            navigate('/');
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                        Register
                    </Typography>
                    <Snackbar 
                        open={showError && error !== null} 
                        autoHideDuration={2000} 
                        onClose={() => setShowError(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>
                    <Formik
                        initialValues={{ email: '', name: '', password: '' }}
                        validationSchema={registerValidationSchema}
                        onSubmit={handleRegister}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <Field
                                    name="email"
                                    as={TextField}
                                    margin="normal"
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <Field
                                    name="name"
                                    as={TextField}
                                    margin="normal"
                                    fullWidth
                                    label="Name"
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                                <Field
                                    name="password"
                                    as={TextField}
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isSubmitting || loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </Button>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2">
                                        Already have an account?{' '}
                                        <Link to="/login" style={{ textDecoration: 'none', color: 'primary.main' }}>
                                            Login
                                        </Link>
                                    </Typography>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Box>
        </Container>
    );
}