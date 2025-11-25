import { useState } from 'react'
import './App.css'
import cookieImg from "./assets/galleta.png";
import cursorImg from "./assets/cursor.png";
import grandmaImg from "./assets/abuela.png";
import multiplierImg from "./assets/corre.png";

const initialState = {
  damageDealt: 0,

  waveGoal: 100,
  caramels: 20,
  damagePerShot: 1,

  autoShotsPerSecond: 1,
  upgrades: []
};

function App() {
  const [count, setCount] = useState(0)

  function caramelReducer(state, action){
    let outputState = state;
    
     if (action.type == 'CLICK_CANION') {
      outputState = { ...state, damageDealt: state.damageDealt + state.autoShotsPerSecond }
    }
    else if (action.type == 'BUY_MULTIPLIER' && state.cookies >= state.multiplierPrice) {
      outputState =
      {
        ...state,
        autoShotsPerSecond: state.autoShotsPerSecond + 1,
        cookies: state.cookies - state.multiplierPrice,
        multiplierPrice: Math.round(state.multiplierPrice * state.multiplierPriceIncrement)
      }
    }

    return outputState;
  }

  const [state, dispatch] = useReducer(caramelReducer, initialState)

  return (
    <>
    </>
  )
}

export default App
