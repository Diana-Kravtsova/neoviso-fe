import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

const CardContentInfo = ({info}) => {
    return (
        <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
            {info.map((text, key) => (
                <Typography key={key}>
                    {text}
                </Typography>
            ))}
        </CardContent>
    );
};

export default CardContentInfo;
