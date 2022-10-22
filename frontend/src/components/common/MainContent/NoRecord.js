import { TableRow, TableBody, TableCell, Paper, Typography } from '@mui/material';

// Refer: https://stackoverflow.com/questions/398734/colspan-all-columns

const NoRecord = ({ filterName }) => {
    return (
        <TableBody>
            <TableRow >
                <TableCell align="center" colSpan={"100%"} sx={{ py: 3 }}>
                    
                        <Typography gutterBottom align="center" variant="subtitle1">
                            No records exist!
                        </Typography>
                    
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export default NoRecord