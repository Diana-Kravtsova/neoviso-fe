import React, { useEffect, useState } from 'react';
import {
    Button,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import AxiosInstance from '../../config/AxiosInstance';
import TextFieldInfo from '../TextFieldInfo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EditDeleteAppointment = ({path, id, date, start, end, customerId, employee}) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [newData, setNewData] = useState({
        date,
        start,
        end,
        customerId,
        employeeId: employee.id
    });

    useEffect(() => {
        AxiosInstance.get(`/customers/list`)
            .then((response) => {
                setCustomers(response.data.model);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleEditClick = () => {
        setEditDialogOpen(true);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleChange = (event) => {
        setNewData({...newData, [event.target.id]: event.target.value});
    };

    const handleEditSubmit = () => {
        AxiosInstance.put(`/${path}/` + id, newData)
            .then((response) => {
                console.log(response);
                setEditDialogOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });

        setEditDialogOpen(false);
    };

    const handleDeleteSubmit = () => {
        AxiosInstance.delete(`/${path}/` + id)
            .then((response) => {
                console.log(response);
                setDeleteDialogOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });

        setDeleteDialogOpen(false);
    };

    return (
        <div>
            <CardActions>
                <Button color='secondary' variant='outlined' onClick={handleEditClick} startIcon={<EditIcon/>}>
                    Edit
                </Button>
                <Button color='secondary' variant='outlined' onClick={handleDeleteClick} startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
            </CardActions>

            <Dialog open={editDialogOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Data</DialogTitle>
                <DialogContent>
                    <TextFieldInfo
                        info={[
                            {id: 'date', type: 'date', value: newData.date},
                            {id: 'start', type: 'time', value: newData.start},
                            {id: 'end', type: 'time', value: newData.end}
                        ]}
                        handleChange={handleChange}
                    />
                    <InputLabel id='customer'>customer</InputLabel>
                    <Select
                        labelId='customer'
                        id='customerId'
                        value={newData.customerId}
                        onChange={(event) => {
                            event.target.id = 'customerId';
                            handleChange(event);
                        }}
                    >
                        {customers.map((customer) => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.fullname}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography>Employee: {employee.fullname}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
                <DialogTitle>Delete Data</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this data?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleDeleteSubmit}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditDeleteAppointment;
