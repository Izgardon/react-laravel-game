import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  useEffect(() => {
    assignRoom();
    loadPlayers();
  }, []);

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

  /* //Loads players already in the game
  const loadPlayers = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/getPlayers/${roomNumber}`
    );

    setPlayers([...data.players]);
  }; */

  //Listens for new players and adds them in
  const joinRoom = async (test: any) => {
    console.log(test);
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
  };
  return (
    <div className="lobby-container">
      <Row className="row-width">
        <Col lg={6} sm={12}>
          <div className="left-container  d-md-none d-none d-lg-block">
            <div>
              <h1>QUIPOCALYPSE</h1>
            </div>
            <div>
              <h3>
                To join this game, go to this URL and enter the following code{" "}
                <b>{roomNumber}</b>
              </h3>
            </div>
          </div>
        </Col>
        <Col lg={6} sm={12}>
          <div className="right-container d-md-none d-none d-lg-block">
            <h1 onClick={getQuips}>Players:</h1>
            <div className="player-list">
              {players.map((player) => (
                <div className="player-list-item" key={player.id}>
                  {player.name}
                </div>
              ))}
            </div>
            {players.length > 2 && host ? (
              <Button className="mt-5" onClick={startGame}>
                Start Game
              </Button>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default GamePage;
