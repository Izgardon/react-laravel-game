import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRoomNumber } from "../../actions/appActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./LandingPage.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

type Props = {};

function LandingPage({}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Form Logic
  const [showButtons, setShowButtons] = useState<boolean>(true);

  const showForm = function (): void {
    setShowButtons(false);
  };

  //Creating Room Logic
  const createGame = async () => {
    //Check local storage to see if game already created
    try {
      let { data } = await axios.post("http://localhost:8000/api/createGame");
      dispatch(setRoomNumber(data.room));
      navigate("/lobby");
    } catch (err) {
      console.log(err);
    }
  };

  //Joining Room Logic
  const [Code, setCode] = useState<any | null>("");
  const [playerName, setPlayerName] = useState<any | null>("");
  const [roomError, setRoomError] = useState<string>("");

  const onCodeChange = (event: any): void => {
    event.preventDefault();
    if (event.target.value.length == 5) {
      return;
    } else if (event.target.value.length > 5) {
      setCode(event.target.value.slice(0, 4));
    } else {
      setCode(event.target.value);
    }
  };
  const onPlayerNameChange = (event: any): void => {
    event.preventDefault();
    if (event.target.value.length == 15) {
      return;
    } else if (event.target.value.length > 15) {
      setPlayerName(event.target.value.slice(0, 14));
    } else {
      setPlayerName(event.target.value);
    }
  };

  const joinRoom = async (code: string) => {
    //Make call to see if code works
    try {
      let { data } = await axios.post(
        `http://localhost:8000/api/joinGame`,
        {
          playerName,
          code,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (data.message == "correct") {
        dispatch(setRoomNumber(code));
        navigate("/lobby");
      } else {
        handleError();
      }
    } catch (err) {
      handleError();
    }
  };
  const handleError = () => {
    setRoomError("Invalid code");
  };

  return (
    <>
      <div className="home-page">
        <div className="container">
          <h1>Quipocalypse</h1>
          <div className="button-container mb-5">
            {showButtons ? (
              <>
                <Button
                  onClick={() => {
                    createGame();
                  }}
                  className="game-button"
                >
                  Create Game
                </Button>
                <Button
                  onClick={() => {
                    showForm();
                  }}
                  className="game-button"
                >
                  Join Game
                </Button>
              </>
            ) : (
              <>
                <Form className="flex-col">
                  <Form.Group className="mb-3" controlId="formBasicCode">
                    <Form.Control
                      value={playerName}
                      onChange={onPlayerNameChange}
                      size="lg"
                      placeholder="Enter your name"
                    />
                    <Form.Control
                      value={Code}
                      onChange={onCodeChange}
                      onKeyDown={(evt) =>
                        (evt.key === "e" && evt.preventDefault()) ||
                        (evt.key === "." && evt.preventDefault())
                      }
                      size="lg"
                      type="number"
                      placeholder="Enter room code"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => {
                      joinRoom(Code);
                    }}
                  >
                    Join
                  </Button>
                  <span className="form-error">{roomError}</span>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
