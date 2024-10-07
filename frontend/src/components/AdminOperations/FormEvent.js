import React, { useState } from "react";

function FormEvent() {
  const today = new Date();
  const [date, setDate] = useState(new Date(today.setDate(today.getDate())));
  console.log(date);

  const [name, setName] = useState("");

  const handleChangeName = async (e) => {
    // setUser({ ...userDto, [e.target.name]: e.target.value });
    setName((name) => e.target.value);
  };
  const handleChangeDate = async (e) => {};
  const handleSubmit = async (e) => {};
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="container">
        <label htmlFor="fname">Name of Event:</label>
        <input
          type="text"
          id="fname"
          value={name}
          placeholder="Enter name of event"
          onChange={(e) => handleChangeName(e)}
        ></input>
        <input
          type="date"
          id="date"
          // value={date}
          onChange={(e) => handleChangeDate(e)}
        />
      </div>
    </form>
  );
}

export default FormEvent;
