import React from 'react'
import { Divider, Typography } from '@mui/material';


const StudentInfo = ({ row, memberDict }) => {
    const { date, description, venue, members, additional_members } = row;
    const options = { month: 'long', day: 'numeric', year: "numeric" }

    return (
        <div style={{width: "60vw"}}>
            <Typography variant="h4" gutterBottom> {date} </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: "gray" }}> {venue} </Typography>
            <Divider />

            <Typography variant="h6" gutterBottom sx={{ pt: 3, pb: 2 }} style={{whiteSpace: "pre-line"}}>
                {description}
            </Typography>

            <Typography variant="body1" sx={{ py: 1 }}>
                Attended by: {members.map(str => {
                    return (`${memberDict[str]}`)
                })
                }.
            </Typography>

            <Typography variant="body1" sx={{ py: 1 }}>
                Guests: {additional_members.map(str => {
                        return (`${str}`)
                    })
                }
            </Typography>

        </div>
    )
}

export default StudentInfo