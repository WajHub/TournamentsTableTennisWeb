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

function FormPlayer({ setDisplay, loadData }) {
  const [player, setPlayer] = useState({
    firstname: "",
    lastname: "",
    gender: "MAN",
    date: formatDate(new Date()),
  });
  const { firstname, lastname, gender, date } = player;
  const handleChange = async (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8080/api/manage/player/save",
          { firstname, lastname, gender, date },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setDisplay(false);
            loadData();
          } else {
          }
        });
    } catch (error) {}
  };
  return (
    <div>
      {" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container-sm">
          <div className="row justify-content-center m-2">
            <div className="col">
              <div className="row justify-content-center pt-1">
                <label htmlFor="fname" className="m-2">
                  Firstname of Player:
                </label>
              </div>
              <div className="row justify-content-center pb-1">
                <input
                  required
                  type="text"
                  id="fname"
                  placeholder="Enter firstname"
                  value={player.firstname}
                  name="firstname"
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>

              <div className="row justify-content-center pt-1">
                <label htmlFor="fname" className="m-2">
                  Lastname of Player:
                </label>
              </div>
              <div className="row justify-content-center pb-1">
                <input
                  required
                  type="text"
                  id="fname"
                  placeholder="Enter lastname"
                  value={player.lastname}
                  name="lastname"
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>

              <div className="row justify-content-center pt-1">
                <label htmlFor="fname" className="m-2">
                  Gender
                </label>
              </div>
              <div
                className="row justify-content-center pb-1"
                onChange={(e) => handleChange(e)}
              >
                <input
                  className="m-1"
                  type="radio"
                  name="gender"
                  value="MAN"
                  defaultChecked
                ></input>
                {"   "}
                Male
                <input
                  className="m-1"
                  type="radio"
                  name="gender"
                  value="WOMAN"
                ></input>{" "}
                Female
              </div>

              <div className="row justify-content-center pt-1">
                <label htmlFor="date" className="m-2">
                  Date:
                </label>
              </div>
              <div className="row justify-content-center pb-1">
                <input
                  type="date"
                  id="date"
                  value={player.date}
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <button className="btn btn-success">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormPlayer;
