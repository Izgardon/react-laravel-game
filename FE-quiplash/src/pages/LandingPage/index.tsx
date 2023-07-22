import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setRoomNumber,
  setHost,
  setActivePlayer,
} from "../../actions/appActions";
import { useNavigate } from "react-router-dom";
import AppState from "../../types/AppState";

import axios from "axios";

import "./LandingPage.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {};

function LandingPage({}: Props) {
  //General logic
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    cleanUpData();
  }, []);

  const cleanUpData = () => {
    axios.post("http://localhost:8000/api/cleanData");
  };

  //Form Logic
  const [showButtons, setShowButtons] = useState<boolean>(true);

  const showForm = function (): void {
    setShowButtons(false);
  };

  //Creating Room Logic
  const createGame = async () => {
    //Check local storage to see if game already created
    setLoading(true);
    try {
      //Generating room number
      let { data } = await axios.post("http://localhost:8000/api/createGame");
      //Store logic
      dispatch(setRoomNumber(data.room));
      dispatch(setHost(true));
      //Navigating to next page
      navigate("/lobby");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //Joining Room Logic
  const [code, setCode] = useState<any | null>("");
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
    //Final checks
    if (playerName.length == 0) {
      handleError("Please enter a name");
      return;
    } else if (code.length != 4) {
      handleError("Please enter a correct code");
      return;
    }
    setLoading(true);
    //Make call to see if code works
    try {
      let { data } = await axios.post(
        `http://localhost:8000/api/createPlayer`,
        {
          playerName,
          roomNumber: code,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (data.message == "correct") {
        dispatch(setRoomNumber(code));
        dispatch(setActivePlayer(data.player));
        navigate("/lobby");
      } else if (data.message == "taken") {
        handleError("Name already taken");
      } else if (data.message == "full") {
        handleError("Room is full");
      } else {
        handleError("Invalid code");
      }
    } catch (err) {
      handleError("Invalid code");
    } finally {
      setLoading(false);
    }
  };
  const handleError = (message: string) => {
    setRoomError(message);
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
                    loading ? "" : createGame();
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
                      className="mb-2"
                      value={playerName}
                      onChange={onPlayerNameChange}
                      size="lg"
                      placeholder="Enter your name"
                    />
                    <Form.Control
                      value={code}
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
                      loading ? "" : joinRoom(code);
                    }}
                  >
                    Join
                  </Button>
                  <span className="form-error">{roomError}</span>
                </Form>
              </>
            )}
          </div>
          <ClipLoader
            loading={loading}
            color="red"
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
