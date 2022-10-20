import { Divider, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"

import { Link } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import CustomTheme from "../../assets/themes/CustomTheme";

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import useHeaderVisiblityStore from '../../storages/HeaderVisibility';

// 4th is one what is based of now
// https://shuffle.dev/components/material-ui/all/footer#:~:text=Footer%20is%20the%20place%20where,over%20the%20less%20important%20ones.


const Footer = () => {

    
    const { hideUserOptions } = useHeaderVisiblityStore();


    return (

        <ThemeProvider theme={CustomTheme}>
            { (!hideUserOptions) && 
            <Box sx={{
                justifyContent: 'space-evenly',
                pt: 2, width: "100%",
                bottom: 0,
                zIndex: (theme) => theme.zIndex.drawer + 1
            }} >
                <Divider />
                <Paper sx={{ display: "flex", padding: 4, flexDirection: "column" }}>
                    <Box sx={{ display: "inline-flex", justifyContent: "space-between", mb: 1 }}>
                        <Box >
                            <Typography variant="h6" component="div" style={{ display: 'inline-block' }}
                                sx={{
                                    flexGrow: 1,
                                    color: CustomTheme.palette.primary.main,
                                    fontWeight: CustomTheme.typography.fontWeightBold
                                }}>
                                Redfowl Infotech
                            </Typography>
                        </Box>
                        <Box>
                            <Link style={{ textDecoration: 'none', color:"inherit", margin: "0 1em" }} to='https://www.freepik.com/free-vector/isolated-tower-crane-cartoon-style_26348418.htm#query=crane%20machine&position=0&from_view=keyword'>
                                <Typography variant="subtitle2" component="div" style={{ display: 'inline-block' }}
                                    sx={{ color: CustomTheme.palette.primary.main, 
                                        fontWeight: CustomTheme.typography.fontWeightBold
                                    }} >
                                    Image by brgfx on Freepik
                                </Typography>
                            </Link>

                            <Link style={{ textDecoration: 'none', color:"inherit", margin: "0 1em" }} to='/'>
                                <Typography variant="subtitle2" component="div" style={{ display: 'inline-block' }} 
                                    sx={{ color: CustomTheme.palette.primary.main, 
                                        fontWeight: CustomTheme.typography.fontWeightBold }} >
                                    Link 2
                                </Typography>
                            </Link>

                            <Link style={{ textDecoration: 'none', color:"inherit", margin: "0 1em"}} to='/'>
                                <Typography variant="subtitle2" component="div" style={{ display: 'inline-block' }} 
                                    sx={{ color: CustomTheme.palette.primary.main, 
                                        fontWeight: CustomTheme.typography.fontWeightBold }} >
                                    Link 3
                                </Typography>
                            </Link>
                        </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ display: "inline-flex", justifyContent: "space-between", mt: 3 }}>
                        <Box >
                            <Typography variant="caption" component="div" style={{ display: 'inline-block' }}
                                sx={{ flexGrow: 1, color: CustomTheme.palette.primary.main, }}>
                                @2022 Redfowl Infotech. All rights reserved.
                            </Typography>
                        </Box>
                        <Box>
                            <Link style={{ textDecoration: 'none', color:"inherit", margin: "0 1em" }} to='/'>
                                <FacebookIcon sx={{ color: CustomTheme.palette.primary.main }}/>
                            </Link>

                            <Link style={{ textDecoration: 'none', color:"inherit", margin: "0 1em" }} to='/'>
                                <TwitterIcon sx={{ color: CustomTheme.palette.primary.main }}/>
                            </Link>

                            <Link style={{ textDecoration: 'none', color:"inherit", margin: "0 1em" }} to='/'>
                                <InstagramIcon sx={{ color: CustomTheme.palette.primary.main }}/>
                            </Link>

                            <Link style={{ textDecoration: 'none', color:"inherit", margin: "0 1em" }} to='/'>
                                <LinkedInIcon sx={{ color: CustomTheme.palette.primary.main }}/>
                            </Link>
                        </Box>
                    </Box>

                </Paper>
            </Box>}
        </ThemeProvider>
    )
}

export default Footer