import axios from "axios";
import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../Assets/Styles/dashboard.css";

export default function Dashboard() {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const user = localStorage.getItem("user") && localStorage.getItem("user");
  const role = user === null ? "" : JSON.parse(user).role;
  const Role = role && role.toUpperCase();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const loggedIn = () => (!user ? navigate("/") : "");

    loggedIn();
    axios
      .get(`http://localhost:5500/api/v1/${Role}`)
      .then(function (response) {
        addToast(response.data.message, {
          autoDismiss: true,
          appearance: "success",
        });
        setDatas(response.data.data);
        console.log("datassss===>>>", datas);
      })
      .catch(function (error) {
        addToast(error.response.data.message, {
          autoDismiss: true,
          appearance: "error",
        });
        console.log(error.response);
      });
  }, []);

  return (
    <div className="main dashboard">
      <Navbar section="dashboard" />
      <div
        style={{
          width: "60%",
          padding: "2rem",
          flexDirection: "column",
          flex: "2",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: "12px 0",
            color: "#49b2d5 !important",
          }}
        >
          All Medical Records
        </h1>
        {Role !== "ADMIN" && (
          <div className="datas">
            <ul className="datas_1 headers">
              {datas.length &&
                Object.keys(datas[0])
                  .filter((x) => x !== "type")
                  .map((k) => <li>{k}</li>)}
            </ul>
            {datas.length &&
              datas.map((data1) => {
                const lis = [];
                for (const key in data1) {
                  if (
                    Object.hasOwnProperty.call(data1, key) &&
                    key !== "type"
                  ) {
                    const element = data1[key];
                    lis.push(<li>{element}</li>);
                  }
                }
                return <ul className="datas_1">{lis}</ul>;
              })}
          </div>
        )}
        {Role === "ADMIN" &&
          Object.keys(datas).map((d) => {
            return (
              <>
                <h2 style={{ margin: "2rem 0", textAlign: "center" }}>{d}</h2>
                <div className="datas">
                  <ul className="datas_1 headers">
                    {datas[d].length &&
                      Object.keys(datas[d][0])
                        .filter((x) => x !== "type")
                        .map((k) => <li>{k}</li>)}
                  </ul>
                  {datas[d].length &&
                    datas[d].map((data1) => {
                      const lis = [];
                      for (const key in data1) {
                        if (
                          Object.hasOwnProperty.call(data1, key) &&
                          key !== "type"
                        ) {
                          const element = data1[key];
                          lis.push(<li>{element}</li>);
                        }
                      }
                      return <ul className="datas_1">{lis}</ul>;
                    })}
                </div>
              </>
            );
          })}
        {/* </section> */}
      </div>
    </div>
  );
}
