import { Box } from "@mui/system"
import { Divider, Paper, Typography, Grid } from "@mui/material"
import crane from '../../assets/images/crane.jpg'


const UnderDevelopment = () => {
    return (

        <Grid container spacing={2}>
            <Grid item xs={6} md={6} sx={{ display: "flex", p: 0, alignItems: 'center', }}>

                <Box sx={{m: 4}}>
                <Typography variant="h2" gutterBottom>
                    Under Development!
                </Typography>

                <Typography variant="h4" gutterBottom>
                    Please check back here later.
                </Typography>

                </Box>
            </Grid>
            <Grid item xs={6} md={6} sx={{ display: "flex", justifyContent: "space-around", p:0, alignItems: 'center',}}>
                
                    <img src={crane} alt="" height={500} />
                
            </Grid>
        </Grid>

    )
}

export default UnderDevelopment