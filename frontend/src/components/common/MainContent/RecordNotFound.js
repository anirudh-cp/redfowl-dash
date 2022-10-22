import { TableRow, TableBody, TableCell } from '@mui/material';
import { SearchNotFound } from '.'

// Refer: https://stackoverflow.com/questions/398734/colspan-all-columns

const RecordNotFound = ({ filterName }) => {
    return (
        <TableBody>
            <TableRow >
                <TableCell align="center" colSpan={"100%"} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} sx={{p: 2}} />
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export default RecordNotFound