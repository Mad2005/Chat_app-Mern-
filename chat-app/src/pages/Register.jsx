import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import bee from "../assets/bee.png"

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Clear previous error
    setError('');

    const formdata = {
      username,
      email,
      password
    };

    try {
      const response = await axios.post(registerRoute, formdata);
      if (response.status === 200) { 
        console.log("account created ")
        localStorage.setItem("chat-app-current-user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        toast.error("An error occurred while signing up.");
      }
    } catch (err) {
      toast.error("An error occurred: " + (err.response?.data?.message || err.message));
      console.error("Registration error:", err);
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  return (
    <>
      <FormContainer>
        <div>
          {/* <h2 style={{color:"#1c011c"}}>Sign Up</h2> */}
          <div className="brand">
            <img src={bee} alt="logo" className="logo" />
            <h1>Buzzy</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" style={{color:"White"}}>Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" style={{color:"White"}}>Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" style={{color:"White"}}>Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Sign Up</button>
            <span>
              Already have an account? <Link to="/login">Login.</Link>
            </span>
          </form>
        </div>
      </FormContainer>
      <ToastContainer {...toastOptions} />
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
    gap: 1rem;
    justify-content: center;

    img {
      height: 4rem;
    }

    h1 {
       color: #1c011c;
      padding-top: 0.6rem;
      font-size:4rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color:  #1c011c;
    border-radius: 2rem;
    padding: 3rem 5rem;
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
