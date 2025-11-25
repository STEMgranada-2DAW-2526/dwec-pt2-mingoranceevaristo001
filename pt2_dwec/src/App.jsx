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
  numeroOleada: 1,

  autoShotsPerSecond: 1,
  upgrades: [],

  multiplierPrice: 10,
  canionTurronPrecio: 15,
  renosLanzaPrecio: 30,
  arbolLaser: 50,
  
  caramelsIncrement: 10,

  multiplierPriceIncrement: 1.2,
  multiplierOleada : 1.1
};

export default function App() {

  function caramelReducer(state, action) {
    let outputState = state;

    if (action.type == 'CLICK_SHOOT') {
      outputState = {
        ...state, 
        damageDealt: state.damageDealt +1
      }
    } else if (action.type == 'BUY_MULTIPLIER' && state.caramels >= state.multiplierPrice) {
      outputState = {
        ...state, autoShotsPerSecond: state.autoShotsPerSecond + 1,
        caramels: state.caramels - state.multiplierPrice,
        multiplierPrice: Math.round(state.multiplierPrice * state.multiplierPriceIncrement)
      }
    }
     else if (action.type == 'BUY_DAMAGE_UPGRADE' && state.caramels >= state.canionTurronPrecio) {
      outputState = {
        ...state, caramels: state.caramels - state.canionTurronPrecio
      }
    }
    else if (action.type == 'AUTO_SHOOT') {
      outputState =
      {
        ...state,
        damageDealt: state.damageDealt + 1
      }

    }
    else if (action.type == 'NEXT_WAVE') {
      if (state.damageDealt =100) {
        outputState =
      {
        ...state,
        numeroOleada: state.numeroOleada + 1,
        damageDealt : state.damageDealt - state.damageDealt,
        caramels: state.caramels + state.caramelsIncrement,
        waveGoal:  state.waveGoal * state.multiplierOleada 
      }
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
          <h1 className='col-4'>{state.waveGoal} vida</h1>
          <h1 className='col-4'>{state.caramels} caramelos</h1>
          <h1 className='col-4'>{state.damageDealt} </h1>
          <h1 className='col-4'>{state.numeroOleada} </h1>
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_SHOOT' })}>
            <img className='img-fluid' src={torre} />
          </button>
        </div>
        <div className='row justify-content-center'>
          MEJORAS
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
          <p className='col-md-2 col-3'>{state.multiplierPrice} </p>
          <p className='col-md-2 col-3'>{state.multiplierPrice} </p>
          <p className='col-md-2 col-3'>{state.grandmaPrice} </p>
        </div>
      </div>

    </>
  )
}


