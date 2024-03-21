import React, { useEffect, useState } from 'react';
import {
    Button,
    CardActions, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import AxiosInstance from '../../config/AxiosInstance';
import TextFieldInfo from '../TextFieldInfo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Roles } from '../../config/Roles';

const EditDeleteEmployee = ({path, id, fullname, email, phone, address, department, roles}) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [newData, setNewData] = useState({
        fullname,
        email,
        roles,
        phone,
        address,
        departmentId: department.id
    });

    useEffect(() => {
        AxiosInstance.get(`/departments/list`)
            .then((response) => {
                setDepartments(response.data.model);
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

    // not needed, but if change back-end request might need
    // const handleChangeUser = (event) => {
    //     setNewData({...newData, user: {...newData.user, [event.target.id]: event.target.value}});
    // };

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

    const handleChangeCheckbox = (event) => {
        let newRoles;

        if (event.target.checked) {
            newRoles = newData.roles.concat(event.target.id);

        } else {
            newRoles = newData.roles.filter((role) => role !== event.target.id);
        }
        setNewData({...newData, roles: newRoles});
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
                            {id: 'fullname', type: 'text', value: newData.fullname},
                            {id: 'email', type: 'text', value: newData.email},
                            {id: 'phone', type: 'text', value: newData.phone},
                            {id: 'address', type: 'text', value: newData.address}
                        ]}
                        handleChange={handleChange}
                    />
                    <InputLabel id='department'>department</InputLabel>
                    <Select
                        labelId='department'
                        id='departmentId'
                        value={newData.departmentId}
                        onChange={(event) => {
                            console.log(event.target);
                            event.target.id = 'departmentId';
                            handleChange(event);
                        }}
                    >
                        {departments.map((department) => (
                            <MenuItem key={department.id} value={department.id}>
                                {department.fullname}
                            </MenuItem>
                        ))}
                    </Select>
                    {Object.values(Roles).map((role, key) => (
                        <FormControlLabel
                            label={role}
                            key={key}
                            control={
                                <Checkbox
                                    id={role}
                                    checked={newData.roles.includes(role)}
                                    onChange={handleChangeCheckbox}
                                    inputProps={{'aria-label': 'controlled'}}
                                />
                            }
                        />
                    ))}
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

export default EditDeleteEmployee;
