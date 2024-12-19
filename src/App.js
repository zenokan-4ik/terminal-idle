import { useState, useEffect } from 'react';
import './App.css';
import Terminal from './components/Terminal';
import Game from './components/Game';

function App() {
  const [started, setStarted] = useState(0)
  const [balance, setBalance] = useState(1)
  const [gain, setGain] = useState(1)
  const [gainUPG, setGainUPG] = useState(1.01)
  const [prestige, setPrestige] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(balance + (gain*(prestige+1))/10)
    }, 100);

    return () => clearInterval(interval);
  }, [balance]);
  
  return (
    <div className="App">
      {
        started ?
        <Game
          balance={balance}
          gain={gain}  
          prestige={prestige}
        /> :
        <p></p>
      }
      <Terminal
        setStarted={setStarted}
        setBalance={setBalance}
        balance={balance}
        setGain={setGain}
        gain={gain}
        setGainUPG={setGainUPG}
        gainUPG={gainUPG}
        prestige={prestige}
        setPrestige={setPrestige}
      />
    </div>
  );
}

export default App;
