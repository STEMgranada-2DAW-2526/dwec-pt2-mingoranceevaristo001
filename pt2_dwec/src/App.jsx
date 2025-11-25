import { useEffect, useReducer } from 'react'
import './App.css'
import torre from "./assets/torre.png";
import arbol_laser from "./assets/arbol_laser.png";
import canion_turron from "./assets/canion_turron.png";
import multiplicador from "./assets/multiplicador.png";
import reno_lanza_cohetes from "./assets/reno_lanza_cohetes.png";



const initialState = {
  damageDealt: 0,

  waveGoal: 100,
  caramels: 20,
  damagePerShot: 1,
  vidaOleada: 100,

  autoShotsPerSecond: 1,
  upgrades: []
};

export default function App() {

  function caramelReducer(state, action) {
    let outputState = state;
    const multiplierPriceIncrement = 1.2;

    if (action.type == 'CLICK_SHOOT') {
      outputState = {
        ...state, damageDealt: state.damageDealt + state.clickMultiplier
      }
    } else if (action.type == 'BUY_MULTIPLIER' && state.caramels >= state.multiplierPrice) {
      outputState = {
        ...state, clickMultiplier: state.clickMultiplier + 1,
        damageDealt: state.caramels - state.multiplierPrice,
        multiplierPrice: Math.round(state.multiplierPrice * state.multiplierPriceIncrement)
      }
    }
    else if (action.type == 'AUTO_SHOOT') {
      outputState =
      {
        ...state,
        damageDealt: state.damageDealt + state.danioOleada * 0.1
      }

    }
    return outputState;
  }

  const [state, dispatch] = useReducer(caramelReducer, initialState)

  useEffect(() => {
    let timer = setInterval(() => {
      dispatch({ type: 'AUTO_SHOOT' })
    }, 1000);

    return () => clearInterval(timer)
  }, []);

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <h1 className='col-12'>{Math.round(state.damageDealt)} </h1>
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_SHOOT' })}>
            <img className='img-fluid' src={torre} />
          </button>
        </div>
        <div className='row justify-content-center'>
          <button className='col-md-2 col-3' onClick={() => dispatch({ type: 'BUY_MULTIPLIER' })}>
            <img className='img-fluid' src={multiplicador} />
            
          </button>
          <button className='col-md-2 col-3' onClick={() => dispatch({ type: 'BUY_MULTIPLIER' })}>
            <img className='img-fluid' src={canion_turron} />
            x{state.clickMultiplier}
          </button>
          <button className='col-md-2 col-3' onClick={() => dispatch({ type: 'BUY_GRANDMA' })}>
            <img className='img-fluid' src={reno_lanza_cohetes} />
            
          </button>
          <button className='col-md-2 col-3' onClick={() => dispatch({ type: 'BUY_GRANDMA' })}>
            <img className='img-fluid' src={arbol_laser} />
            
          </button>
        </div>
        <div className='row justify-content-center'>
          <p className='col-md-2 col-3'>{state.cursorPrice} </p>
          <p className='col-md-2 col-3'>{state.multiplierPrice} </p>
          <p className='col-md-2 col-3'>{state.grandmaPrice} </p>
        </div>
      </div>

    </>
  )
}


