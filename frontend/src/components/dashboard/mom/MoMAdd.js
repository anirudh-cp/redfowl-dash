import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

import CustomTheme from '../../../assets/themes/CustomTheme';


const MoMAdd = ({ memberList, memberDict, handleSubmit, uid, mode, record }) => {

  const [members, setMembers] = useState(record !== undefined ? record.members : "");

  const [focusStart, setFocusStart] = useState(false);
  const [hasValueStart, setHasValueStart] = useState(false);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = Object.fromEntries(data);
    
    if (mode === "edit")
      data.uuid = record.uuid;
    
    data.members = members;

    data.additional_members = data.additional_members.split(',').map(object => object.trim());

    console.log(data)
    handleSubmit(data);
  };

  const getDefaults = (members) => {
    let defaults = memberList.filter(function(object) {
      return members.indexOf(object.uuid) != -1;
    });
    return defaults
  }


  return (
    <ThemeProvider theme={CustomTheme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />

        <Typography component="h1" variant="h4" sx={{ pt: 1, pb: 2 }}>
          {mode === "edit" ? "Edit MoM" : "Add MoM"}
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
              required
              fullWidth
              name="date"
              label="Date"
              id="date"
              defaultValue={record !== undefined ? record.date : ""}

              type={hasValueStart || focusStart ? "date" : "text"}
              onFocus={() => { setFocusStart(true); }}
              onBlur={() => { setFocusStart(false); }}
              onChange={(e) => {
                if (e.target.value) setHasValueStart(true);
                else setHasValueStart(false);
              }} />

            <TextField
              margin="normal"
              fullWidth
              id="venue"
              label="Venue"
              type="text"
              name="venue"
              autoFocus
              defaultValue={record !== undefined ? record.venue : ""} />

            <TextField
              margin="normal"
              fullWidth
              id="description"
              required
              label="Description"
              type="text"
              multiline
              rows={4}
              name="description"
              autoFocus
              defaultValue={record !== undefined ? record.description : ""} />

            <Autocomplete
              multiple
              sx={{mt: 2, mb: 1}}
              id="members-outlined"
              options={memberList}
              getOptionLabel={option => `${option.name} (${option.email})`}
              defaultValue={record !== undefined ? getDefaults(record.members) : []}
              onChange={(event, value) => setMembers(value.map(object => object.uuid))}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Members"
                  placeholder="Search Members"
                />
              )}
            />

            <TextField
              margin="normal"
              fullWidth
              id="additional_members"
              label="Additional Members"
              type="text"
              name="additional_members"
              defaultValue={record !== undefined ? record.additional_members : ""} />

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

export default MoMAdd