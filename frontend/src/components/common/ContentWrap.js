import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


const ContentWrap = ({ childElement }) => {
    return (
        <Box sx={{display: "flex"}}>
            <Paper sx={{display:"flex", height:"100%", width: "100%", minHeight: "84vh"}}>
                {childElement}
            </Paper>
        </Box>
  )
}

export default ContentWrap

