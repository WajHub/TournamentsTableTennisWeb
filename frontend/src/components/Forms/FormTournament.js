import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FormTournament({ setDisplay, loadData }) {
  const { id } = useParams();
  const [tournament, setTournament] = useState({
    name: "",
    category: "",
    event_id: -1,
  });
  const { name, category, event_id } = tournament;
  const [categories, setCategories] = useState([]);
  const handleChange = (e) => {
    setTournament({ ...tournament, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/categories`);
      setCategories(result.data);
      setTournament({ ...tournament, ["category"]: result.data[0].name });
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios
        .post(
          `http://localhost:8080/api/manage/save/tournament`,
          { name, category, event_id },
          { withCredentials: true }
        )
        .then(setDisplay(false));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container">
          <div className="row m-2">
            <h4>Tournament</h4>
          </div>
          <div className="row m-2">
            <label htmlFor="tournament">Name: </label>
          </div>
          <div className="row m-2">
            <div className="col fs-6">
              <input
                required
                type="text"
                id="fname"
                placeholder="Enter name of tournament"
                value={tournament.name}
                name="name"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
          <div className="row m-2">
            <label htmlFor="tournament">Choose category: </label>
          </div>
          <div className="row m-2">
            <div className="col fs-6">
              <select
                name="category"
                id="category"
                onChange={(e) => handleChange(e)}
                required
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input className="btn btn-success" type="submit"></input>
        </div>
      </form>
    </div>
  );
}

export default FormTournament;
