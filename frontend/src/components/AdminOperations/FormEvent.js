import React, { useState } from "react";
import axios from "axios";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function FormEvent() {
  const [date, setDate] = useState(formatDate(new Date()));

  const [name, setName] = useState("");

  const handleChangeName = async (e) => {
    setName((name) => e.target.value);
  };
  const handleChangeDate = async (e) => {
    setDate(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      await axios
        .post(
          "http://localhost:8080/api/manage/event/save",
          { name: name, date: date },
          {
            withCredentials: true,
          }
        )
        .then();
    } catch {}
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="container-sm">
        <div className="row justify-content-center m-2">
          <label htmlFor="fname" className="m-2">
            Name of Event:
          </label>
          <input
            required
            type="text"
            id="fname"
            value={name}
            placeholder="Enter name of event"
            onChange={(e) => handleChangeName(e, name)}
          ></input>
        </div>
        <div className="row justify-content-center m-2">
          <label htmlFor="date" className="m-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => handleChangeDate(e)}
          ></input>
        </div>
        <div className="row justify-content-center m-2">
          <button className="btn btn-success">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default FormEvent;
