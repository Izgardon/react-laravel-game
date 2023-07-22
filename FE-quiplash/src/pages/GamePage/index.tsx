import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppState from "../../types/AppState";
import { pusher } from "../../App";

import "./GamePage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function GamePage() {
  //General---------------
  const navigate = useNavigate();

  //Store--------------
  const roomNumber = useSelector((state: AppState) => state.roomNumber);
  const activePlayer = useSelector((state: AppState) => state.activePlayer);
  const players = useSelector((state: AppState) => state.players);

  //States--------------------
  //Questions
  const [quips, setQuips] = useState<any>([]);
  const [roundQuips, setRoundQuips] = useState<string[]>([]);
  const [roundEnd, setRoundEnd] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string>("");
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
    setQuips(data.quips);
    /* let round1 = data?.quips.round1.find(
      (player: AppState["activePlayer"]) => (player.id = activePlayer.id)
    ); */
    let activePlayerId = activePlayer.id;
    if (activePlayerId) {
      let round1 = data.quips.round1[activePlayerId];
      setRoundQuips(round1);
      setRoundEnd(false);
      startTimer(data.time);
    } else {
      navigate("/");
    }
  };

  const handleTimerEnd = () => {
    setRound(round + 1);
    setRoundEnd(true);
  };

  //Helper functions

  const startTimer = (time: any) => {
    setTimeLeft(time);
  };

  const tick = () => {
    if (timeLeft == null) return;
    else if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    }
  };

  const onAnswerChange = (event: any) => {
    setAnswer(event.target.value);
  };

  return (
    <div className="lobby-container">
      {roundEnd ? (
        <>
          <div>Round over!</div>
        </>
      ) : (
        <>
          <div className="question-form">
            <div className="time">{timeLeft}</div>
            <Form className="flex-col">
              <Form.Group className="mb-3" controlId="formBasicCode">
                <Form.Control
                  className="mb-2"
                  value={answer}
                  onChange={onAnswerChange}
                  size="lg"
                  placeholder="Enter your answer"
                  as="textarea"
                  maxLength={50}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => {}}>
                Join
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
}

export default GamePage;
