import React, {useEffect, useState} from "react";
import {isMod, useAuth} from "../../providers/AuthProvider.jsx";
import {deleteUser, editRole, loadUsers} from "../../utils/api.js";
import User from "./User.jsx";
import Profile from "./Profile.jsx";
import {Button} from "@mui/material";

function About() {
  const { user } = useAuth();
  const [users, setUsers] = useState([])

  useEffect(() => {
    if((user && isMod(user))) {
      loadUsers().then((result) => {
        if (result.status === 200) {
          setUsers(result.data)
        }
      })
    }
  }, []);

  const handleDelete = (idUser) => {
    deleteUser(idUser).then((result) => {
      if(result.status === 204){
        setUsers(
            users.filter((u) => u.id !== idUser)
        )
      }
    })
  }

  const handleEdit = (idUser, newRole) => {
    editRole(idUser, newRole).then(r => {
      if(r.status === 200) {
        const nextUsers = users.map((u) => {
            if(u.id === idUser) return {...u, role: newRole}
            else return u;
        })
        setUsers(nextUsers);
      }
    });
  }

  return (
      <div className="my-4">
        <Profile user={user} />
        {(users && isMod(user)) &&
            users.filter((u) => u.email !== user.email).map((user, index) =>
                <User
                    key={index}
                    user={user}
                    onDelete={handleDelete}
                    onEditRole={handleEdit}
                />)
        }

      </div>
  );
}

export default About;
