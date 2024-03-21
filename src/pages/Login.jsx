import '../App.css';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AxiosInstance from '../config/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getStorage } from '../services/StorageService';

const Login = () => {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (event) => {
        setRememberMe(event.target.checked);
        localStorage.setItem('rememberMe', event.target.checked ? 1 : 0);
    };

    const handleLogin = (formValue) => {
        const {username, password} = formValue;

        AxiosInstance.post(`token`, {
            username: username,
            password: password
        })
            .then((response) => {
                const storage = getStorage();
                storage.setItem('accessToken', response.data.access);
                storage.setItem('refreshToken', response.data.refresh);
                navigate(`/main`);
            })
            .catch((error) => {
                console.error('Error during login', error);
            });
    };

    const validationSchema = Yup.object({
        username: Yup
            .string('Enter your username')
            .required('Username is required'),
        password: Yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required')
        // todo return when final deploy
        //.matches(/(\D\d|\d\D)+/g, 'Must have numbers and characters')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleLogin(values);
        }
    });

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
            }}
        >
            <Avatar><LockOutlinedIcon/></Avatar>
            <Typography component='h1' variant='h5'>Sign in</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{gap: 3}}>
                    <TextField
                        fullWidth
                        autoFocus
                        id='username'
                        name='username'
                        label='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        fullWidth
                        sx={{marginTop: 3}}
                        id='password'
                        name='password'
                        label='Password'
                        type='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleChange} value={rememberMe} color='primary'/>}
                        label='Remember me'
                    />
                    <Button
                        fullWidth
                        color='secondary'
                        variant='contained'
                        type='submit'
                        sx={{mt: 3, mb: 2}}
                    >
                        Submit
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to={'#'} variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Box>
    );
};

export default Login;
