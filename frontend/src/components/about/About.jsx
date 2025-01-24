import React, {useEffect, useState} from "react";
import {isMod, useAuth} from "../../providers/AuthProvider.jsx";
import {deleteUser, loadUsers} from "../../utils/api.js";
import User from "./User.jsx";
import Profile from "./Profile.jsx";

function About() {
  const { user } = useAuth();
  const [users, setUsers] = useState([])

  useEffect(() => {
    if((user && isMod(user))) {
      loadUsers().then((result) => {
        if (result.status === 200) setUsers(result.data)
      })
    }
  }, []);

  const handleDelete = (idUser) => {
    console.log(idUser)
    deleteUser(idUser).then((result) => {
      if(result.status === 204){
        setUsers(
            users.filter((u) => u.id !== idUser)
        )
      }
    })
  }

  return (
      <div>
        <Profile user={user} />
        {(user && isMod(user)) &&
            users.map((user, index) => <User key={index} user={user} onDelete={handleDelete}/>)
        }
      </div>
  );
}

export default About;
