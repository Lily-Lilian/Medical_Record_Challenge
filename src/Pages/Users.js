import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import "../Assets/Styles/users.css";
import User from "../Components/User";

export default function Dashboard() {
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);

  const user = localStorage.getItem("user");
  if (!user) navigate("/");

  useEffect(() => {
    axios
      .get(`http://localhost:5500/api/v1/users/all`)
      .then(function (response) {
        console.log(response.data.datas.Payload[0]);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDatas(response?.data?.datas?.Payload);
      })
      .catch(function (error) {
        toast.error(error.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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
