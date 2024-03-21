import React, { useState, useEffect } from 'react';
import AppointmentCard from './AppointmentCard';
import { TablePagination } from '@mui/material';
import AxiosInstance from '../../config/AxiosInstance';
import { getUser } from '../../services/UserService';
import ModalFormAdd from './ModalFormAdd';

const AppointmentList = () => {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const GetData = () => {
        AxiosInstance.get(`appointments/list?pageNumber=${currentPage + 1}&pageSize=${rowsPerPage}`).then((res) => {
            setAppointmentsData(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        const user = getUser();

        if (user) {
            setCurrentUser(user);
        }

        GetData();
    }, [currentPage, rowsPerPage]);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (loading ?
        <p>Loading data...</p> :
        <>
            <h2>Upcoming Appointments</h2>
            {
                <ModalFormAdd path={'appointments'}/>
            }
            {appointmentsData.model.map((appointment) => (
                <AppointmentCard
                    key={appointment.id}
                    employee={currentUser.id}
                    appointment={appointment}
                />
            ))}

            <table>
                <tbody>
                <tr>
                    <TablePagination
                        count={appointmentsData.totalItems}
                        page={currentPage}
                        onPageChange={handlePageChange}
                        color='secondary'
                        showFirstButton
                        showLastButton
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default AppointmentList;
