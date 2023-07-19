import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppState from "../../types/AppState";
import { pusher } from "../../App";

import "./GameHostPage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function GameHostPage() {
  /*  //General
  const navigate = useNavigate();

  //Store
  const roomNumber = useSelector((state: AppState) => state.roomNumber);
  const host = useSelector((state: AppState) => state.host);

  //States
  const [players, setPlayers] = useState<Player[]>([]);

  //Pusher channel
  let channel;

  //Logic on page load
  useEffect(() => {
    assignRoom();
    loadPlayers();
  }, []);

  //Checks room number and binds player to it
  const assignRoom = () => {
    if (roomNumber) {
      console.log("working1");
      channel = pusher.subscribe(roomNumber);
      channel.bind("joinRoom", joinRoom);
    } else {
      navigate("/");
    }
  };

  //Loads players already in the game
  const loadPlayers = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/getPlayers/${roomNumber}`
    );

    setPlayers([...data.players]);
  };

  //Listens for new players and adds them in
  const joinRoom = async () => {
    console.log("working2");
    const { data } = await axios.get(
      `http://localhost:8000/api/getPlayers/${roomNumber}`
    );
    setPlayers([...data.players]);
  };

  //Starting the game

  const startGame = () => {};

  const getQuips = async () => {
    const { data } = await axios.get("http://localhost:8000/api/quips");
    console.log(data);
  }; */
  return <div className="lobby-container"></div>;
}

export default GameHostPage;
