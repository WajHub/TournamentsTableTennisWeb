import React from "react";
import { useAuth } from "../components/AuthProvider";

function About() {
  const { user, handleSignIn, handleSignOut } = useAuth();
  return (
    <div>{user ? <div>Hello user!</div> : <div>It is not for you!</div>}</div>
  );
}

export default About;
