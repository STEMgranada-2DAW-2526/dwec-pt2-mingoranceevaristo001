import { useState } from 'react'
import './App.css'
import arbol_laser from "./assets/arbol_laser.png";
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

  function caramelReducer(state, action) {
    let outputState = state;

    if (action.type == 'CLICK_SHOOT') {
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
    else if (action.type == 'BUY_DAMAGE_UPGRADE' && state.cookies >= state.cursorPrice) {
      outputState =
      {
        ...state,
        cursorCount: state.cursorCount + 1,
        cookies: state.cookies - state.cursorPrice,
        cursorPrice: Math.round(state.cursorPrice * state.cursorPriceIncrement)
      }
    }

    return outputState;
  }

  const [state, dispatch] = useReducer(caramelReducer, initialState)

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <img class="img-fluid" src={arbol_laser}></img>
          <h1 className='col-12'>{Math.round(state.damageDealt)} </h1>
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_COOKIE' })}>
            <img className='img-fluid' src={cookieImg} />
          </button>
        </div>
        <div className='row justify-content-center'>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_CURSOR' })}>
            <img className='img-fluid' src={cursorImg} />
            x{state.cursorCount}
          </button>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_MULTIPLIER' })}>
            <img className='img-fluid' src={multiplierImg} />
            x{state.clickMultiplier}
          </button>
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_GRANDMA' })}>
            <img className='img-fluid' src={grandmaImg} />
            x{state.grandmaCount}
          </button>
        </div>
        <div className='row justify-content-center'>
          <p className='col-md-2 col-12'>{state.cursorPrice} 🍪</p>
          <p className='col-md-2 col-12'>{state.multiplierPrice} 🍪</p>
          <p className='col-md-2 col-12'>{state.grandmaPrice} 🍪</p>
        </div>
      </div>
    </>
  )
}

export default App
