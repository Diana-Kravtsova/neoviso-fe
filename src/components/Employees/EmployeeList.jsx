import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../config/AxiosInstance';
import { hasPermission } from '../../services/UserService';
import ModalFormAddEmployee from './ModalFormAddEmployee';
import EmployeeCard from './EmployeeCard';
import { Roles } from '../../config/Roles';

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [employeesData, setEmployeesData] = useState([]);

    const GetData = () => {
        AxiosInstance.get(`employees/list`).then((res) => {
            setEmployeesData(res.data);
            console.log(res.data);
            setLoading(false);
        })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
       GetData();
    }, []);

    return (loading ?
            <p>Loading data...</p> :
            <>
                <h2>Employees list</h2>
                {
                    hasPermission([Roles.ADMIN]) &&
                    <ModalFormAddEmployee path={'employees'}/>
                }
                {employeesData.model.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        {...{employee}}
                    />
                ))}
            </>
    );
};

export default EmployeeList;
