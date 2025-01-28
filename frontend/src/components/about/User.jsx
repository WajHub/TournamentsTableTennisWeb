import React, {useState} from 'react';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl, InputLabel, MenuItem, Select,
    Typography
} from "@mui/material";

function User({user, onDelete, onEditRole}) {
    const [userRole, setUserRole] = useState(user.role);

    const handleChange = (event) => {
        setUserRole(event.target.value);
    };

    return (
        <div className="d-flex justify-content-center flex-wrap">
        <Accordion className="mt-4 accordion w-50">

            <AccordionSummary
                expandIcon={<i className="bi bi-arrow-down-circle-fill"></i>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">{user.username}({user.role})</Typography>
            </AccordionSummary>

            <AccordionDetails className="d-flex justify-content-center">
                <div className="border rounded p-4 mt-2 shadow ">
                    <h5 className="text-center m-4">User Details</h5>
                    <div className="card">
                        <div className="card-header">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Email: </b>
                                    {user.email}
                                </li>
                                <li className="list-group-item">
                                    <b>Fullname: </b>
                                    {user.fullName}
                                </li>
                                <li className="list-group-item">
                                    <b>Role: </b>
                                    {/*{user.role}*/}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={userRole}
                                            label="Role"
                                            onChange={handleChange}
                                            variant="outlined"
                                        >
                                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                                            <MenuItem value="MODERATOR">MODERATOR</MenuItem>
                                            <MenuItem value="USER">USER</MenuItem>
                                        </Select>
                                    </FormControl>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </AccordionDetails>

            <AccordionActions>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={(e) => onEditRole(user.id, userRole)}
                    disabled={userRole === user.role}
                >
                    Submit changes
                </Button>
                {user.role!=="ADMIN" &&
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={(e) => onDelete(user.id)}
                    >
                        Delete
                    </Button>
                }
            </AccordionActions>

        </Accordion>
        </div>
);
}

export default User;