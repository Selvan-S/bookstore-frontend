import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";

const DateFormat = ({ updatedAt, createdAt }) => {
  const [createdUpdatedText, setCreatedUpdatedText] = useState("");

  useEffect(() => {
    if (updatedAt > createdAt) {
      setCreatedUpdatedText("Updated: " + formatDate(updatedAt));
    } else {
      setCreatedUpdatedText("Created: " + formatDate(createdAt));
    }
  }, []);

  return (
    <div>
      {createdUpdatedText}
      {console.log(createdUpdatedText)}
    </div>
  );
};

export default DateFormat;
