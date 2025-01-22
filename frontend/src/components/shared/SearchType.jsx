import React, {useState, useRef, useEffect} from "react";
import {TextField} from "@mui/material";


function SearchType({ focusOnInput, handleChangeFilter}) {

  const [searchItem, setSearchItem] = useState("");
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    const newSearchItem = e.target.value;
    setSearchItem(newSearchItem);
  };

  const handleKeyDown = (e) => {
    if(document.activeElement !== inputRef.current && e.key>='a' && e.key<='z')
      inputRef.current.focus();
  }

  const addKeyboardListener = () =>{
    document.addEventListener("keydown", handleKeyDown, false);
  }

  const removeKeyboardListener = () => {
    document.removeEventListener("keydown", handleKeyDown, false);
  }

  useEffect(() => {
    if(focusOnInput) addKeyboardListener();
    return () => {
      removeKeyboardListener();
    }
  },[focusOnInput])

  return (
      <TextField
         id="outlined-basic"
         label="Search"
         variant="outlined"
         inputRef={inputRef}
         type="text"
         value={searchItem}
         onChange={(e)=> {
           handleInputChange(e)
           handleChangeFilter(e.target.name, e.target.value)
         }}
         placeholder="Search"
         name="name"
      />
  );
}

export default SearchType;
