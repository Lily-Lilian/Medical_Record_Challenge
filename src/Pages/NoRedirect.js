import React from "react";

export default function NoRedirect() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "40% !important",
          display: "flex",
          flexDirection: "column",
        }}
        className="container"
      >
        <h1
          style={{
            color: "red !important",
            height: "4rem",
            marginTop: "4rem",
            opacity: "1",
          }}
        >
          Page not found ❌❌❌❌❌❌❌
        </h1>
      </div>
    </div>
  );
}
