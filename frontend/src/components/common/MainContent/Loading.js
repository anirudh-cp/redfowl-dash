import { TableRow, TableBody, TableCell, Paper, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';


const Loading = () => {
    return (
        <TableBody>
            <TableRow >
                <TableCell align="center" colSpan={"100%"} sx={{ py: 3 }}>

                    <LinearProgress color="info" />

                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export default Loading