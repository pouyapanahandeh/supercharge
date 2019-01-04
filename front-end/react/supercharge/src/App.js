import React, { useState } from 'react';
import Card from './components/card'
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';



function App() {
  //glb function
  const [flipped, setFlipped] = useState([])
  const handleClick = (id) => setFlipped((flipped) => [...flipped, id])


  return(
    <div>
      <h2> This is the memory Game</h2>
        <Card
          id={1}
          width={100}
          height={100}
          back={'/img/back.png'}
          front={'/img/reactu.png'}
          flipped={flipped.includes(1)}
          handleClick={() => handleClick(1)}
        />
    </div>
  )
}

export default App;
