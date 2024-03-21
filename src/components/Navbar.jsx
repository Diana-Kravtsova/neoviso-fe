import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser, logOut } from '../services/UserService';
import { Button } from '@mui/material';

export default function Navbar(props) {
    const [currentUser, setCurrentUser] = useState({});

    const {content} = props;
    const path = useLocation().pathname;

    useEffect(() => {
        const user = getUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Box sx={{display: 'flex', flexGrow: 1, p: 3}}>
            <CssBaseline/>
            <AppBar position='fixed' color='secondary' sx={{zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{display: 'flex',justifyContent: 'space-between'}}>
                    <Typography variant='h6'>
                        {currentUser.username}
                    </Typography>
                    <Button onClick={logOut} variant='h6'>
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant='permanent'
                sx={{
                    width: 240,
                    flexShrink: 0,
                    boxSizing: 'border-box'
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        <ListItem key={1} disablePadding>
                            <ListItemButton component={Link} to='/main' selected={'/main' === path}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Main'}/>
                            </ListItemButton>
                        </ListItem>

                        <ListItem key={2} disablePadding>
                            <ListItemButton component={Link} to='/customers' selected={'/customers' === path}>
                                <ListItemIcon>
                                    <AssignmentIndIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Customers'}/>
                            </ListItemButton>
                        </ListItem>

                        <ListItem key={3} disablePadding>
                            <ListItemButton component={Link} to='/employees' selected={'/employees' === path}>
                                <ListItemIcon>
                                    <BadgeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Employees'}/>
                            </ListItemButton>
                        </ListItem>

                        <ListItem key={4} disablePadding>
                            <ListItemButton component={Link} to='/departments' selected={'/departments' === path}>
                                <ListItemIcon>
                                    <LocalHospitalIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Departments'}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Box component='main' sx={{flexGrow: 1, p: 3, marginBottom: '48px'}}>
                <Toolbar/>
                {content}
            </Box>
        </Box>
    );
}
