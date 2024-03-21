import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes';
import Departments from './pages/Departments';
import Employees from './pages/Employees';
import Footer from './components/Footer';
import * as React from 'react';
import { Box } from '@mui/material';

function App() {
    const location = useLocation();
    const noNavbar = location.pathname === '/';

    return (noNavbar ?
        <Routes>
            <Route path='/' element={<Login/>}/>
        </Routes>

        :

        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Navbar
                content={
                    <Routes>
                        <Route element={<ProtectedRoute/>}>
                            <Route path='*' element={<>Not found</>} />
                            <Route path='/main' element={<Main/>}/>
                            <Route path='/customers' element={<Customers/>}/>
                            <Route path='/employees' element={<Employees/>}/>
                            <Route path='/departments' element={<Departments/>}/>
                        </Route>
                    </Routes>
                }
            />
            <Footer/>
        </Box>
    );
}

export default App;