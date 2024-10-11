import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Event() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  //   useEffect(() => {
  //     loadEvent();
  //   }, []);
  const loadEvent = async () => {
    const result = await axios.get();
  };
  return <div>TEST</div>;
}

export default Event;
