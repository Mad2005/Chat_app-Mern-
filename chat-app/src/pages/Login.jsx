import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import bee from "../assets/bee.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error

    if (username && password) {
        try {
            const formData = { username, password };
            const response = await axios.post(loginRoute, formData);

            if (response.status === 200) {
                localStorage.setItem("chat-app-current-user", JSON.stringify(response.data.user));
                navigate("/");
                toast.success('Login successful!', toastOptions);
            } else {
                toast.error('Unexpected response from server', toastOptions);
            }
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        }
    } else {
        setError('Please fill in both fields'); 
    }
  };

  return (
    <>
      <FormContainer>
        <div className="brand">
          <img src={bee} alt="logo" className="logo" />
          <h1>Buzzy</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" style={{ color: "White" }}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" style={{ color: "White" }}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ab7db3;
  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    img {
      height: 4rem;
    }
    h1 {
      color: #1c011c;
      padding-top: 0.6rem;
      font-size: 4rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #1c011c;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #cc09f1;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #d68be4;
      outline: none;
    }
  }
  button {
    background-color: #cc09f1;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #d68be4;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #cc09f1;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
