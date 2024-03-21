import React from 'react';
import { BottomNavigation, Card } from '@mui/material';
import { hasPermission, isCurrentEmployee } from '../../services/UserService';
import EditDeleteAppointment from './EditDeleteAppointment';
import CardContentInfo from '../CardContentInfo';
import { Roles } from '../../config/Roles';

const AppointmentCard = ({appointment}) => {
    const {id, date, start, end, customer, employee} = appointment;

    return (
        <Card sx={{marginBottom: 3}}>
            <CardContentInfo
                info={[
                    date,
                    `${start} - ${end}`,
                    `Customer: ${customer.fullname}`,
                    `Employee: ${employee.fullname}`
                ]}
            />

            {(hasPermission([Roles.ADMIN, Roles.RECEPTION]) ||
              isCurrentEmployee(employee)) &&
                <BottomNavigation sx={{justifyContent: 'flex-end', alignItems: 'center'}}>
                    <EditDeleteAppointment
                        path={'appointments'}
                        {...{id, date, start, end}}
                        customerId={customer.id}
                        employee={employee}
                    />
                </BottomNavigation>
            }
        </Card>
    );
};

export default AppointmentCard;
