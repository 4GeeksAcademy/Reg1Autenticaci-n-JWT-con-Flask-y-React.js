import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Login = () => {
  const {store, dispatch} = useGlobalReducer();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        dispatch({ type: "set_user", payload: {user: data.user} });
        alert("Login successful!");
        navigate("/private");
      } else {
        setError(data.msg || "Invalid email or password.");
        dispatch({ type: "set_user", payload: {user: false} });
      }
    } catch (err) {
      setError("Network error. Please try again.");
      dispatch({ type: "set_user", payload: {user: false} });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #E9D5FF, #C4B5FD)",
      }}
    >
      <div
        className="p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffffcc",
          borderRadius: "20px",
          backdropFilter: "blur(5px)",
        }}
      >
        <h2 className="mb-4 text-center" style={{ color: "#6B21A8", fontWeight: "700" }}>
          Login
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email address:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                border: "1px solid #D8B4FE",
                borderRadius: "10px",
                boxShadow: "0 0 8px #e9d5ff60",
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                border: "1px solid #D8B4FE",
                borderRadius: "10px",
                boxShadow: "0 0 8px #e9d5ff60",
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#7C3AED",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "10px",
              boxShadow: "0 0 12px #a78bfa",
              transition: "all 0.2s ease-in-out"
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
