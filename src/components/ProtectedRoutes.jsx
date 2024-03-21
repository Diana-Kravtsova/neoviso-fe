import { Outlet, Navigate } from 'react-router-dom';
import { getStorage } from '../services/StorageService';

const ProtectedRoute = () => {
    const token = getStorage().getItem('accessToken');

    return (
        token ? <Outlet/> : <Navigate to='/'/>
    );
};

export default ProtectedRoute;
