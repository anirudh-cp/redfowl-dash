import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';


import CustomTheme from '../../../assets/themes/CustomTheme';


const UserAdd = ({ handleSubmit, record }) => {

  const handleSubmitForm = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = Object.fromEntries(data);

    data.uuid = record.uuid;

    handleSubmit(data);
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />


        <Typography component="h1" variant="h4" sx={{ pt: 1, pb: 2 }}>
          Edit User
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>

          <Box component="form" onSubmit={handleSubmitForm} noValidate sx={{ mt: 1, maxWidth: "xs" }}>

            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              type="text"
              name="name"
              autoFocus
              defaultValue={record !== undefined ? record.name : ""} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, minWidth: "md" }}>
              Submit
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default UserAdd