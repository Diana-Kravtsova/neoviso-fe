import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../config/AxiosInstance';
import { getUser } from '../../services/UserService';
import SendIcon from '@mui/icons-material/Send';

const ModalFormAdd = ({path}) => {
    const [date, setDate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customers, setCustomers] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState('');

    useEffect(() => {
        AxiosInstance.get(`/employees/list`)
            .then((response) => {
                const userId = getUser().id;
                const employees = response.data.model;
                const currentEmployee = employees.find(employee => employee.userId === userId);
                setCurrentEmployee(currentEmployee);
            })
            .catch((error) => {
                console.log(error);
            });

        AxiosInstance.get(`/customers/list`)
            .then((response) => {
                setCustomers(response.data.model);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleAddClick = () => {
        setAddDialogOpen(true);
    };

    const handleAddClose = () => {
        setAddDialogOpen(false);
    };

    const handleAddSubmit = () => {
        const data = {
            date: date,
            start: start,
            end: end,
            customerId: customerId,
            employeeId: currentEmployee.id
        };

        AxiosInstance.post(`/${path}`, data)
            .then((response) => {
                console.log(response);
                setAddDialogOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });

        setAddDialogOpen(false);
    };

    return (
        <>
            <Button
                onClick={handleAddClick}
                endIcon={<SendIcon/>}
                variant='contained'
                sx={{marginBottom: 3}}
                color='secondary'
            >
                Add
            </Button>
            <Dialog open={addDialogOpen} onClose={handleAddClose}>
                <DialogTitle>Add new appointment</DialogTitle>
                <DialogContent>
                    {/* todo make for every path
                    <TextFieldInfo
                        info={[
                            {id: "date", type: "date", value: date},
                            {id: "start", type: "time", value: start},
                            {id: "end", type: "time", value: end},
                        ]}
                        handleChange={handleChange}
                    />*/}
                    <TextField
                        id='date'
                        type='date'
                        value={date}
                        fullWidth
                        onChange={(e) => setDate(e.target.value)}
                        sx={{mb: 2}}
                    />
                    <TextField
                        id='start'
                        type='time'
                        value={start}
                        fullWidth
                        onChange={(e) => setStart(e.target.value)}
                        sx={{mb: 2}}
                    />
                    <TextField
                        id='end'
                        type='time'
                        value={end}
                        fullWidth
                        onChange={(e) => setEnd(e.target.value)}
                        sx={{mb: 2}}
                    />

                    <FormControl fullWidth>
                        <InputLabel id='customer'>customer</InputLabel>
                        <Select
                            label='customer'
                            id='customerId'
                            value={customerId}
                            onChange={(event) => {
                                event.target.id = 'customerId';
                                setCustomerId(event.target.value);
                            }}
                        >
                            {customers.map((customer) => (
                                <MenuItem key={customer.id} value={customer.id}>
                                    {customer.fullname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography>Employee: {currentEmployee.fullname}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    <Button onClick={handleAddSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalFormAdd;
