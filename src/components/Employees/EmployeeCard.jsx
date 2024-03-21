import React from 'react';
import { BottomNavigation, Card } from '@mui/material';
import { hasPermission } from '../../services/UserService';
import CardContentInfo from '../CardContentInfo';
import EditDeleteEmployee from './EditDeleteEmployee';
import { Roles } from '../../config/Roles';

const EmployeeCard = ({employee}) => {
    const {id, fullname, email, phone, address, department, roles} = employee;

    return (
        <Card sx={{marginBottom: 3}}>
            <CardContentInfo
                info={[
                    `${fullname}`,
                    `${email}`,
                    `${phone}`,
                    `${address}`,
                    `${department.fullname}`,
                    `${roles}`,
                ]}
            />

            {hasPermission([Roles.ADMIN]) &&
                <BottomNavigation sx={{justifyContent: 'flex-end', alignItems: 'center'}}>
                    <EditDeleteEmployee
                        path={'employees'}
                        {...{id, fullname, email, phone, address, department, roles}}
                    />
                </BottomNavigation>
            }
        </Card>
    );
};

export default EmployeeCard;
