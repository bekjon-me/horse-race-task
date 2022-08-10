import React from 'react';
import './Modal.scss';

export default function Modal({ winner, start, setPlayer, didYouWin }) {
  return (
    <div className="container">
      <h2>{winner}</h2>
      <h2>{didYouWin}</h2>
      <button className="start" onClick={start}>
        Just start
      </button>
      <br />
      Which number horse will you choose? <br />
      <div className="grid">
        <button onClick={() => setPlayer(0)}>1</button>
        <button onClick={() => setPlayer(1)}>2</button>
        <button onClick={() => setPlayer(2)}>3</button>
        <button onClick={() => setPlayer(3)}>4</button>
        <button onClick={() => setPlayer(4)}>5</button>
        <button onClick={() => setPlayer(5)}>6</button>
      </div>
    </div>
  );
}
