import React from 'react';
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";

function User({user, onDelete}) {

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
                                    {user.role}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </AccordionDetails>

            <AccordionActions>
                <Button color="primary" variant="outlined" disabled>Edit</Button>
                {user.role!=="ADMIN" &&
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={(e) => onDelete(user.id)}
                    >Delete</Button>
                }
            </AccordionActions>

        </Accordion>
        </div>
);
}

export default User;