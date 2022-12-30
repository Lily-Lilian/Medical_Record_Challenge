import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Navbar from "../Components/Navbar";
import "../Assets/Styles/users.css";
import User from "../Components/User";

export default function Dashboard() {
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);

  const user = localStorage.getItem("user");
  if (!user) navigate("/");

  useEffect(() => {
    axios
      .get(`http://localhost:5500/api/v1/users/all`)
      .then(function (response) {
        console.log(response.data.datas.Payload[0]);
        addToast(response?.data?.message, {
          autoDismiss: true,
          appearance: "success",
        });
        setDatas(response?.data?.datas?.Payload);
      })
      .catch(function (error) {
        addToast(error.response?.data?.message, {
          autoDismiss: true,
          appearance: "success",
        });
        console.log(error);
      });
  }, []);

  const csvmaker = function () {
    let arrayData = [
      [
        "ID",
        "Firstname",
        "Lastname",
        "Email",
        "Gender",
        "Age",
        "Country",
        "Role",
      ],
      ...datas.map(Object.values),
    ];
    let csvContent =
      "data:text/csv;charset=utf-8," +
      arrayData.map((e) => e.join(",")).join("\n");
    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };

  return (
    <div className="main">
      <Navbar />
      <div
        style={{
          display: "flex",
          width: "60%",
          height: "90vh",
          padding: "2rem",
          flexDirection: "column",
          flex: "2",
        }}
      >
        <h1
          style={{
            marginBottom: "4rem",
            textAlign: "center",
            color: "black",
          }}
        >
          Users List
        </h1>
        <div className="users-list">
          {datas.map((user) => (
            <User key={user.firstName} data={user} />
          ))}
        </div>
        <button
          style={{
            width: "20%",
            height: "3rem",
            marginTop: "2rem",
            background: "none",
            fontWeight: "bolder",
            fontSize: "large",
            color: "white",
            border: "1px solid",
            background: "#31cf6f",
            cursor: "pointer",
            borderRadius: "10px",
            alignSelf: "center",
          }}
          type="button"
          onClick={csvmaker}
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}
