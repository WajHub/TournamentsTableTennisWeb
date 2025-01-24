import React from 'react';
import {isAuth, isMod, useAuth} from "../../../providers/AuthProvider.jsx";

function EditPlayerButton({player, onEdit}) {
    const { user } = useAuth();

    const handleEdit = (e) => {
        console.log(player)
        onEdit(player);
    };
    return (
        <>
            {isAuth(user) && isMod(user) ? (
                <div className="btn btn-primary m-1" onClick={(e) => handleEdit(e)}>
                    {" "}
                    <i className="bi bi-pencil"></i>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default EditPlayerButton;