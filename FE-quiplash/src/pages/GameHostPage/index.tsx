import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppState from "../../types/AppState";
import { pusher } from "../../App";

import "./GameHostPage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Player {
  id: number;
  name: string;
}

function GameHostPage() {
  //General---------------------
  let navigate = useNavigate();
  const dispatch = useDispatch();

  //Store--------------------
  const roomNumber = useSelector((state: AppState) => state.roomNumber);
  const host = useSelector((state: AppState) => state.host);
  const players = useSelector((state: AppState) => state.players);

  //States--------------------
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [answeredPlayersList, setAnsweredPlayersList] = useState<Player[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [round, setRound] = useState<number>(1);

  //Variables---------------------
  let channel;

  //useEffects-------------------

  //On page load
  useEffect(() => {
    setUpChannelBinds();
    if (players.length > 0) {
      assignQuips();
      setPlayersList([...players]);
    }
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimerEnd();
      return;
    }
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {}, [round]);

  //Functions---------------

  //Checks room number and binds player to it
  const setUpChannelBinds = () => {
    if (roomNumber) {
      channel = pusher.subscribe(roomNumber);
      //All binds
      channel.bind("playerAnswered", (data: any) => playerAnswered(data));
    } else {
      navigate("/");
    }
  };

  //General functions

  const assignQuips = async () => {
    let playerCount = players.length;
    playerCount = 2;
    await axios
      .post(`http://localhost:8000/api/quips`, {
        playerCount,
        roomNumber,
      })
      .then(() => startTimer(10));
  };

  const playerAnswered = (data) => {
    setAnsweredPlayersList([...answeredPlayersList, data.player]);
    setPlayersList(playersList.filter((player) => player.id != data.player.id));
  };

  //Helper functions

  const startTimer = (time) => {
    setTimeLeft(time);
  };

  const tick = () => {
    if (timeLeft == null) return;
    else if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    }
  };

  const handleTimerEnd = () => {
    setRound(round + 1);
  };

  return (
    <div className="game-container">
      <Row className="row-width">
        <Col className="timer-col" lg={12} sm={12}>
          <div className="flex-apart">
            <div>{timeLeft ? timeLeft : "0"}</div>
            <div className="ml-auto">Round: {round}</div>
          </div>
        </Col>
        <Col className="player-col" lg={12} sm={12}>
          <div className="flex-row">
            {playersList.map((player: any) => (
              <div className="player-list-item" key={player.id}>
                {player.name}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default GameHostPage;
