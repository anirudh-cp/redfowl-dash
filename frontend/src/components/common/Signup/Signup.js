import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import CustomTheme from '../../../assets/themes/CustomTheme';

import AccountFields from './AccountFields';


export default function MultiPageSignup({ setInfo, setError, setMessage, setFilterName}) {


    return (
        <ThemeProvider theme={CustomTheme}>
            <Container component="main" maxWidth="xs" sx={{ minWidth: "xs" }}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonAddIcon />
                    </Avatar>

                    <Typography component="h1" variant="h4" sx={{ pt: 1, pb: 2 }}>
                        Sign-up
                    </Typography>

                    <Box>
                        <AccountFields 
                            setError={setError} setInfo={setInfo} setMessage={setMessage}
                            setFilterName={setFilterName}  /> 
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}