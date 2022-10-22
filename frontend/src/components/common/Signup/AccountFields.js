import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material'

import useAuth from '../../../utils/Auth';


const AccountFields = ({ setInfo, setError, setMessage, setFilterName, }) => {

    const { register, loading } = useAuth();

 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
       
        if(Object.fromEntries(data)['password'] != Object.fromEntries(data)['password2'])
        {
            setError(true);
            setMessage('Passwords do not match')
            return false;
        }

        console.log(Object.fromEntries(data));
        
        const response = await register(data);
        
        if (response['code'] === 201)
        {
            setInfo(true);
            setFilterName(0);
            setMessage('User created successfully');
            console.log(response['data']);
            return true;
        }
        else if(response['code'] === 409)
        {
            setError(true);
            setMessage('The email is already in use')
            return false;
        }
    };


    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> 
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus />
            
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
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

            <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password" />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Signup
            </Button>


            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                /> */}
        </Box>
    )
}

export default AccountFields