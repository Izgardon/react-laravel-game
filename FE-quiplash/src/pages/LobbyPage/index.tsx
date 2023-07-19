import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../types/AppState";
import { pusher } from "../../App";

import "./LobbyPage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function LobbyPage() {
  const navigate = useNavigate();

  //Store
  const roomNumber = useSelector((state: AppState) => state.roomNumber);

  //Pusher channel
  let channel;

  useEffect(() => {
    assignRoom();
  }, []);

  const assignRoom = () => {
    console.log(roomNumber);
    if (roomNumber) {
      channel = pusher.subscribe(roomNumber);
      channel.bind("joinRoom", joinRoom);
    } else {
      navigate("/");
    }
  };

  const joinRoom = (eventData: Object) => {
    console.log(eventData, "hi");
  };

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
                To join this game, go to this URL and enter the following code
              </h3>
            </div>
          </div>
        </Col>
        <Col lg={6} sm={12}>
          <div className="right-container d-md-none d-none d-lg-block">
            <h1 onClick={getQuips}>Players:</h1>
            <div className="player-list">
              <div className="player-list-item"></div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LobbyPage;
