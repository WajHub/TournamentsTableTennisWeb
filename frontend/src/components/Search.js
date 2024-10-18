import React, { useState } from "react";

function Search({ apiSet, setFilteredSet, filter }) {
  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e) => {
    const newSearchItem = e.target.value;
    setSearchItem(newSearchItem);
    setFilteredSet(apiSet.filter((eve) => filter(eve, newSearchItem)));
  };

  return (
    <div className="row mt-3 justify-content-center">
      <div className="col-4">
        {" "}
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Type to search"
        />
      </div>
    </div>
  );
}

export default Search;
