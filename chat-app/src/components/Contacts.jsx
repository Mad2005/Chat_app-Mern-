import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bee from "../assets/bee.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("chat-app-current-user"));
        if (data) {
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
        }
      } catch (error) {
        console.error("Error fetching user data from localStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  function changeCurrentChat(index, contact) {
    setCurrentSelected(index);
    changeChat(contact);
  }

  return (
    <Container>
      {currentUserImage && (
        <>
          
          <div className="brand">
            <img src={bee} alt="logo" className="logo" />
            <h1>Buzzy</h1>
          </div>
        
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                </div>
                <div className="username">
                  <h4>{contact.username}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color:#2f022f;
  border-radius: 2rem;
  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    h1 {
      color: white;
      padding-top: 0.6rem;
      
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #e4a4e8;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #440a44;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h4 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #7d607f;
    }
  }

  .current-user {
    background-color:#230423;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
