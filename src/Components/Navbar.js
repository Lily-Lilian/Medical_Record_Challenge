import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import "../Assets/Styles/dashboard.css";

export default function Navbar(props) {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  if (!user) {
    navigate("/");
  }

  let role = (user && JSON.parse(user).role) || "";

  const Role = role && role.toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header
      className="colors"
      style={{
        height: "97.8vh",
        width: "40%",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        background: "rgba(255, 255, 255, 0.561) !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        color: "green !important",
        padding: "0 4rem",
        flex: "1",
        maxWidth: "150px",
        position: "sticky",
        color: "black",
      }}
    >
      {Role && Role === "ADMIN" ? (
        props.section === "dashboard" ? (
          <Link className="users-button" to="/users">
            Users
          </Link>
        ) : (
          <Link className="users-button" to="/dashboard">
            Dashboard
          </Link>
        )
      ) : (
        ""
      )}
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        <MdOutlineAccountCircle
          style={{
            width: "4rem",
            height: "4rem",
            margin: "2rem 0 1rem 1rem",
          }}
        />
        <p style={{ marginBottom: "1rem" }}>
          {user && JSON.parse(user).firstName + " " + JSON.parse(user).lastName}
        </p>
        {role}
      </span>
      <span
        style={{
          height: "0.1rem",
          color: "black",
          backgroundColor: "1px solid black",
        }}
      />
      <button type="button" onClick={handleLogout} className="logout-button">
        LOGOUT
      </button>
    </header>
  );
}
