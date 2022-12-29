import React from "react";

const User = ({ data }) => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return (
    <div className="user-one">
      <div>
        <img
          src={`https://randomuser.me/api/portraits/${
            data.gender == "Male" ? "men" : "women"
          }/${getRandomInt(1, 99)}.jpg`}
        />
      </div>
      <div>
        <div>
          {data.firstName} {data.lastName} ({data.role})
        </div>
        <div>{data.email}</div>
      </div>
    </div>
  );
};

export default User;
