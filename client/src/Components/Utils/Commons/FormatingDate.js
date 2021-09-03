import React from "react";

function FormatingDate({ dateString }) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default FormatingDate;
