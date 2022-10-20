import { useEffect, useState, forwardRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import useHeaderVisiblityStore from './../storages/HeaderVisibility';
import CustomTheme from './../assets/themes/CustomTheme'

import { useNavigate } from "react-router-dom";
import useAuth from '../utils/Auth';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import background from './../assets/images/background.png' 

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


function Copyright(props) {

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" >
                Redfowl Infotech
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignIn() {

    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let response = await login(data.get('email'), data.get('password'))

        if (response["code"] === 200){
            navigate("/dash");
         }
        else {
             setError(true);
             setMessage(response["data"]);
         }
    };

    const { setHideUserOptions } = useHeaderVisiblityStore();

    useEffect(() => {
        setHideUserOptions(true);
    }, [setHideUserOptions])


    return (
        <ThemeProvider theme={CustomTheme}>

            <Container style={{display: "flex", flexDirection: "column",
        backgroundImage: `url(${background})`, backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: ""}}>
            <Container component="main" maxWidth="xs" 
            sx={{backgroundColor: "rgba(240,240,240,0.15)", marginTop: 5, borderRadius: "15px"}}
            >
                <CssBaseline />

                <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        <> { message } </>
                    </Alert>
                </Snackbar>

                <Snackbar open={loading} autoHideDuration={3000}>
                    <Alert severity="info" sx={{ width: '100%' }}>
                        Signing In...
                    </Alert>
                </Snackbar>

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h4" sx={{ pt: 1, pb: 2 }}>
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password" />

                        {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        /> */}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
{/* 
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}

                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            </Container>
        </ThemeProvider>
    );
}