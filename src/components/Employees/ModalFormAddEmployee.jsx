import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../config/AxiosInstance';
import SendIcon from '@mui/icons-material/Send';
import { Roles } from '../../config/Roles';

const ModalFormAddEmployee = ({path}) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [department, setDepartment] = useState([]);
    const [departmentId, setDepartmentId] = useState('');
    const [roles, setRoles] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    useEffect(() => {
        AxiosInstance.get(`/departments/list`)
            .then((response) => {
                console.log(response.data.model);
                setDepartment(response.data.model);
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
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            departmentId: departmentId,
            roles: roles
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

    const handleChangeCheckbox = (event) => {
        let newRoles;

        if (event.target.checked) {
            newRoles = roles.concat(event.target.id);

        } else {
            newRoles = roles.filter((role) => role !== event.target.id);
        }

        setRoles(newRoles);
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
                <DialogTitle>Add new employee</DialogTitle>
                <DialogContent>
                    <TextField
                        id='fullname'
                        type='text'
                        value={fullname}
                        fullWidth
                        onChange={(e) => setFullname(e.target.value)}
                        sx={{mb: 2}}
                    />
                    <TextField
                        id='email'
                        type='email'
                        value={email}
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{mb: 2}}
                    />
                    <TextField
                        id='phone'
                        type='text'
                        value={phone}
                        fullWidth
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{mb: 2}}
                    />
                    <TextField
                        id='address'
                        type='text'
                        value={address}
                        fullWidth
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{mb: 2}}
                    />

                    <FormControl fullWidth>
                        <InputLabel id='department'>department</InputLabel>
                        <Select
                            label='department'
                            id='departmentId'
                            value={departmentId}
                            onChange={(event) => {
                                setDepartmentId(event.target.value);
                            }}
                        >
                            {department.map((department) => (
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
                                        checked={roles.includes(role)}
                                        onChange={handleChangeCheckbox}
                                        inputProps={{'aria-label': 'controlled'}}
                                    />
                                }
                            />
                        ))}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    <Button onClick={handleAddSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalFormAddEmployee;
