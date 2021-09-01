import React from "react";

function BadRouting({ text }) {
  return (
    <>
      {" "}
      <div className="d-flex justify-content-center">
        <p
          style={{
            borderLeft: "solid #DB3B3B 16px",
            borderRadius: "2px",
            padding: "5px",
          }}
        >
          <span
            style={{
              color: "#DB3B3B",
            }}
          >
            <i>{text}</i>
          </span>
        </p>
      </div>{" "}
    </>
  );
}

export default BadRouting;
