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
  //General---------------
  const navigate = useNavigate();

  //Store--------------
  const roomNumber = useSelector((state: AppState) => state.roomNumber);
  const activePlayer = useSelector((state: AppState) => state.activePlayer);
  const players = useSelector((state: AppState) => state.players);

  //States--------------------
  //Questions
  const [questions, setQuestions] = useState<string[]>([]);
  const [roundEnd, setRoundEnd] = useState<boolean>(false);
  //Timers and rounds
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [round, setRound] = useState<number>(1);

  //Variables---------------------
  let channel;

  //useEffects-------------------

  useEffect(() => {
    setUpChannelBinds();
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
      channel.bind("assignQuips", (data: any) => loadQuips(data));
    } else {
      navigate("/");
    }
  };

  //Gets correct number of available quips
  const loadQuips = (data: any) => {
    console.log(data);
    startTimer(10);
  };

  const handleTimerEnd = () => {
    setRound(round + 1);

    setRoundEnd(!roundEnd);
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

  return <div className="lobby-container">{timeLeft}</div>;
}

export default GamePage;
