import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moch from "../assets/moch.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("chat-app-current-user"));
        if (user && user.username) {
          setUserName(user.username);
        }
      } catch (error) {
        console.error("Error fetching user data from localStorage:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <Container>
      
      <img id="gif"src={moch} alt="Robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Pick a chat to start buzzing!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
    padding-bottom:2rem; 
  }
  span {
    color: #f372fd;
  }
`;
