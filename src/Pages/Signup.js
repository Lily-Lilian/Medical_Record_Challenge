import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import axios from "axios";
import countryList from "react-select-country-list";
import "../Assets/Styles/signup.css";
import { MdLockOutline } from "react-icons/md";

export default function SignupForm() {
  const { addToast } = useToasts();
  const [selected, setSelected] = useState("");
  const selectDropdown = (e) => {
    const val = e.target.value;
    setSelected(val);
  };
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    country: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5500/api/v1/auth/users/signup", {
        ...values,
        role: selected,
      })
      .then(function (response) {
        addToast(response.data.message, {
          autoDismiss: true,
          appearance: "success",
        });
        console.log(response);
        navigate("/login");
      })
      .catch(function (error) {
        addToast(error.response.data.message, {
          autoDismiss: true,
          appearance: "error",
        });
        console.log(error.response);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value, key) => {
    setValue(value);
    setValues({ ...values, [key.name]: value.label });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="heading">
          <h2 className="title">Welcome to Medical Record App</h2>
          <span className="subtitle">
            Already have an account?
            <Link
              className="link"
              to={"/login"}
              style={{ textDecoration: "underline" }}
            >
              Login
            </Link>
          </span>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="role">
            <select onChange={selectDropdown} className="role_select">
              <option selected value="">
                Select Role...
              </option>
              <option value="Admin">Admin</option>
              <option value="Patient">Patient</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Physician">Physician</option>
            </select>
          </div>
          <div className="names">
            <input
              className="input"
              type="text"
              name="firstName"
              value={values.firstName}
              placeholder="Firstname..."
              onChange={handleChange}
            ></input>

            <input
              className="input"
              type="text"
              name="lastName"
              value={values.lastName}
              placeholder="Lastname..."
              onChange={handleChange}
            ></input>
          </div>
          <div className="email">
            <input
              className="input"
              type="email"
              name="email"
              value={values.email}
              placeholder="Email..."
              onChange={handleChange}
            ></input>
          </div>
          <div className="password">
            <input
              className="input"
              type="password"
              name="password"
              value={values.password}
              placeholder="Password..."
              onChange={handleChange}
            ></input>
          </div>
          <div className="age">
            <input
              className="input"
              type="number"
              name="age"
              value={values.age}
              placeholder="Age..."
              onChange={handleChange}
            ></input>
          </div>
          <div className="country">
            <label className="country-label">Select the country </label>
            <Select
              className="country-select"
              options={options}
              name="country"
              value={value}
              onChange={changeHandler}
            />
          </div>
          <label htmlFor="gender" className="gender-label">
            Gender
          </label>
          <div className="gender">
            <label htmlFor="male">
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Male"
                id="male"
              />
              <span>Male</span>
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Female"
                id="female"
              />
              <span>Female</span>
            </label>
            <label htmlFor="other">
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Other"
                id="other"
              />
              <span>Other</span>
            </label>
          </div>
          <div>
            <button className="submit" type="submit" onClick={handleFormSubmit}>
              <MdLockOutline
                size={20}
                style={{ position: "absolute", left: "50px" }}
              />
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
