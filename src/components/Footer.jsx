import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <AppBar
            color='secondary'
            sx={{
                display: 'flex',
                top: 'auto',
                bottom: 0,
                width: '100%',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar sx={{justifyContent: 'center'}}>
                <Typography variant='body3'>
                    Copyright © {year}.
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
