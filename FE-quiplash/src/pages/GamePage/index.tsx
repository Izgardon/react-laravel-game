import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AppState from "../../types/AppState";
import { pusher } from "../../App";

import "./GamePage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function GamePage() {
  //General
  const navigate = useNavigate();

  //Store
  const roomNumber = useSelector((state: AppState) => state.roomNumber);
  const host = useSelector((state: AppState) => state.host);

  //Pusher channel
  let channel;

  //Logic on page load
  useEffect(() => {}, []);

  //Checks room number and binds player to it
  const assignRoom = () => {
    if (roomNumber) {
      channel = pusher.subscribe(roomNumber);
      channel.bind("joinRoom", (data) => {
        joinRoom(data);
      });
    } else {
      navigate("/");
    }
  };

  //Gets correct number of available quips
  const getQuips = async () => {
    const { data } = await axios.get("http://localhost:8000/api/quips");
    console.log(data);
  };

  return <div className="lobby-container"></div>;
}

export default GamePage;
