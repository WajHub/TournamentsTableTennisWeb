import React, {useState, useRef, useEffect} from "react";

function SearchType({ apiSet, setFilteredSet, filter }) {
  const [searchItem, setSearchItem] = useState("");
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    const newSearchItem = e.target.value;
    setSearchItem(newSearchItem);
    setFilteredSet(apiSet.filter((eve) => filter(eve, newSearchItem)));
  };

  const handleKeyDown = (e) => {
    if(document.activeElement !== inputRef.current) inputRef.current.focus();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    }
  }, []);

  return (
    <div className="row mt-3 justify-content-center">
      <div className="col-4">
        {" "}
        <input
          ref={inputRef}
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Type to search"
        />
      </div>
    </div>
  );
}

export default SearchType;
