import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [message, setMessage] = useState("t");

  useEffect(() => {
    // loadMessage();
  }, []);

  //   const loadMessage = async () => {
  //     await axios.get("http://localhost:8080/test").then((response) => {
  //       setMessage(response.data);
  //     });
  //   };

  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <h2>{message}</h2>
      <button type="button" class="btn btn-primary">
        Primary
      </button>
    </div>
  );
}

export default Home;
