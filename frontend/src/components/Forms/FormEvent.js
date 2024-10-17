import React, { useState } from "react";
import axios from "axios";
import Message from "../Message.js";
import { formatDate } from "../../utils/date.js";

function FormEvent({ setDisplay, loadData }) {
  const [date, setDate] = useState(formatDate(new Date()));
  const [name, setName] = useState("");
  const [alertData, setAlertData] = useState(null);

  const handleChangeName = async (e) => {
    setName((name) => e.target.value);
  };
  const handleChangeDate = async (e) => {
    setDate(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8080/api/manage/event/save",
          { name, date },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setDisplay(false);
            loadData();
          } else {
            setAlertData({ content: "Error", type: "danger" });
          }
        });
    } catch (error) {
      setAlertData({ content: error.response.data, typeMessage: "danger" });
    }
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="container-sm">
        <div className="row justify-content-center m-2">
          <div className="col">
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
        </div>

        <button className="btn btn-success">Submit</button>

        {alertData && (
          <Message content={alertData.content} type={alertData.typeMessage} />
        )}
      </div>
    </form>
  );
}

export default FormEvent;
