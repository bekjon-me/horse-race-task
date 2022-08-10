import React, { useEffect, useRef, useState } from 'react';
import './assets/main.scss';
import Modal from './components/Modal';
import Racer from './components/Racer';
import { socket } from './service/socket';

function App() {
  const [horses, setHorses] = useState([]);

  const opacity = useRef(1);
  const modal = useRef(true);
  const winner = useRef();
  const player = useRef(null);

  const startGame = () => {
    modal.current = false;
    socket.emit('start');
    socket.on('ticker', (response) => {
      const res = Array.isArray(response) ? response : [response];
      setHorses(res);
    });
  };

  const setPlayer = (num) => {
    modal.current = false;
    socket.emit('start');
    socket.on('ticker', (response) => {
      const res = Array.isArray(response) ? response : [response];
      setHorses(res);
      player.current = res[num].name;
    });
  };

  horses.forEach((horse) => {
    if (horse.distance === 1000) {
      socket.close();
      if (player.current) {
        if (horse.name === player.current) {
          alert('You win');
        } else {
          alert('you lost');
        }
      }
      modal.current = true;
      winner.current = 'The winner is ' + horse.name;
      opacity.current = 0.3;
    }
  });

  return (
    <div className="App">
      {horses?.map((horse, index) => {
        return (
          <Racer
            opacity={opacity.current}
            key={horse.name}
            name={horse.name}
            distance={horse.distance}
            number={index + 1}
          />
        );
      })}
      {modal.current ? (
        <Modal
          winner={winner.current}
          start={startGame}
          player={player}
          setPlayer={setPlayer}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
