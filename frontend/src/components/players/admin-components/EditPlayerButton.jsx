import React from 'react';
import {isAuth, isMod, useAuth} from "../../../providers/AuthProvider.jsx";
import {Button} from "@mui/material";

function EditPlayerButton({player, onEdit}) {
    const { user } = useAuth();

    const handleEdit = (e) => {
        console.log(player)
        onEdit(player);
    };
    return (
        <>
            {isAuth(user) && isMod(user) ? (
                <Button variant="contained"  className="m-1" onClick={(e) => handleEdit(e)}>
                    {" "}
                    <i className="bi bi-pencil"></i>
                </Button>
            ) : (
                ""
            )}
        </>
    );
}

export default EditPlayerButton;