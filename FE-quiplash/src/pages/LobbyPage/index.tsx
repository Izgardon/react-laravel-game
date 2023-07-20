import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppState from "../../types/AppState";
import { pusher } from "../../App";
import { setPlayers } from "../../actions/appActions";

import "./LobbyPage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

interface Player {
  id: number;
  name: string;
}

function LobbyPage() {
  //General
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Store
  const roomNumber = useSelector((state: AppState) => state.roomNumber);
  const host = useSelector((state: AppState) => state.host);

  //States
  const [playersList, setPlayersList] = useState<Player[]>([]);

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
      channel.bind("joinRoom", loadPlayers);
      loadPlayers();
      channel.bind("startGame", startGame);
    } else {
      navigate("/");
    }
  };

  //Loads players already in the game and listens for new joins
  const loadPlayers = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/getPlayers/${roomNumber}`
    );

    setPlayersList([...data.players]);
    dispatch(setPlayers([...data.players]));
  };

  //Starting the game

  const onStartGame = async () => {
    //Starting game and sending pusher notification to other players
    await axios.post(`http://localhost:8000/api/startGame`, {
      roomNumber,
    });

    navigate("/host");
  };

  const startGame = async () => {
    if (!host) {
      navigate("/game");
    }
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
            <h1>Players:</h1>
            <div className="player-list">
              {playersList.map((player) => (
                <div className="player-list-item" key={player.id}>
                  {player.name}
                </div>
              ))}
            </div>
            {
              /* players.length > 0 &&  */ host ? (
                <Button className="mt-5" onClick={onStartGame}>
                  Start Game
                </Button>
              ) : (
                ""
              )
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LobbyPage;
