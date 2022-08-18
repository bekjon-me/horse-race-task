import React, { useRef, useState } from 'react';
import './assets/main.scss';
import Modal from './components/Modal';
import Racer from './components/Racer';
import { socket } from './service/socket';

function App() {
  const [horses, setHorses] = useState([]);

  let variables = useRef({
    horseNum: null,
    opacity: 1,
    modal: true,
    winner: '',
    player: '',
    gameOver: false,
    didYouWin: '',
    winnerNum: '',
  });

  const startGame = () => {
    variables.current = {
      ...variables.current,
      player: '',
      gameOver: false,
      opacity: 1,
      modal: false,
      didYouWin: '',
      winner: '',
      horseNum: null,
    };

    socket.connect();
    socket.emit('start');
    socket.on('ticker', (response) => {
      const res = Array.isArray(response) ? response : [response];
      setHorses(res);
    });
  };

  const setPlayer = (num) => {
    variables.current = {
      ...variables.current,
      gameOver: false,
      opacity: 1,
      modal: false,
      horseNum: num,
    };

    socket.connect();
    socket.emit('start');
    socket.on('ticker', (response) => {
      const res = Array.isArray(response) ? response : [response];
      setHorses(res);
      variables.current.player = res[num]['name'];
    });
  };
  horses.forEach((horse, index) => {
    if (horse.distance === 1000) {
      variables.current.gameOver = true;
      variables.current.winnerNum = index + 1;
      if (variables.current.player) {
        if (horse.name === variables.current.player) {
          variables.current.didYouWin = 'You win';
        } else {
          variables.current.didYouWin = 'You lost';
        }
      }
      variables.current = {
        ...variables.current,
        winner: 'The winner is ' + horse.name,
        opacity: 0.3,
        modal: true,
      };

      setHorses(horses.map((horse) => (horse.distance = 0)));
      socket.removeAllListeners();
      socket.disconnect();
    }
  });

  return (
    <div className="App">
      {horses?.map((horse, index) => {
        return (
          <Racer
            opacity={variables.current.opacity}
            key={index}
            name={horse.name}
            distance={variables.current.gameOver ? 0 : horse.distance}
            number={index + 1}
            isPlayer={index === variables.current.horseNum ? 'You' : ''}
          />
        );
      })}
      {variables.current.modal ? (
        <Modal
          winner={variables.current.winner}
          winnerNum={
            variables.current.winnerNum
              ? ` (${variables.current.winnerNum})`
              : ''
          }
          start={startGame}
          setPlayer={setPlayer}
          didYouWin={variables.current.didYouWin}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
