import { TextField } from '@mui/material';
import React from 'react';

const TextFieldInfo = ({info, handleChange}) => {
    return (
        info.map((value) => (
            <TextField
                key={value.id}
                id={value.id}
                type={value.type}
                value={value.value}
                fullWidth
                onChange={handleChange}
                sx={{mb: 2}}
            />
        ))
    );
};

export default TextFieldInfo;
