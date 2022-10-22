import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Toolbar, Typography, OutlinedInput, InputAdornment, Button } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import CustomTheme from './../../../assets/themes/CustomTheme'



// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),

  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName, placeholder, 
  showButton, buttonText, buttonIcon, handleButton }) {
  return (
    <RootStyle theme={CustomTheme}
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle theme={CustomTheme}
          value={filterName}
          onChange={onFilterName}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      )}


      {
        showButton ?
          numSelected > 0 ? (
            <></>
          ) : (
            <Button variant="contained" style={{backgroundColor: CustomTheme.palette.secondary.main}} 
            startIcon={buttonIcon} onClick={handleButton}>{buttonText}</Button>
          )
          :
          <></>
      }
    </RootStyle>
  );
}
