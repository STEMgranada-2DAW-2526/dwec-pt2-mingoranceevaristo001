import { useEffect, useReducer } from 'react'
import './App.css'
import torre from "./assets/torre.png";


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
    } else if (action.type == 'BUY_MULTIPLIER' && state.damageDealt >= state.multiplierPrice) {
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
          <h1 className='col-12'>{Math.round(state.damageDealt)} 🍪</h1>
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_SHOOT' })}>
            <img className='img-fluid' src={torre} />
          </button>
        </div>
      </div>

    </>
  )
}


