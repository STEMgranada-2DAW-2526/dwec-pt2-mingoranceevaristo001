import { useEffect, useReducer } from 'react'
import './App.css'
import torre from "./assets/torre.png";


const initialState = {
  damageDealt: 0,

  waveGoal: 100,
  caramels: 20,
  damagePerShot: 1,
  danioOleada: 0,

  autoShotsPerSecond: 1,
  upgrades: []
};

function App() {

  function caramelReducer(state, action){
    let outputState = state;
    const multiplierPriceIncrement = 1.2;

      if (action.type == 'CLICK_SHOOT') {
        outputState = {
          ...state, damageDealt: state.damageDealt + state.clickMultiplier
        }
      }else if (action.type == 'BUY_MULTIPLIER' && state.damageDealt >= state.multiplierPrice) {
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
        damageDealt: state.damageDealt + state.danioOleada * 0.1 + state.grandmaCount * 1
      }
    }
      }




  }

  // function caramelReducer(state, action) {
  //   let outputState = state;

  //   if (action.type == 'CLICK_SHOOT') {
  //     outputState = { ...state, damageDealt: state.damageDealt + state.autoShotsPerSecond }
  //   }
  //   else if (action.type == 'BUY_MULTIPLIER' && state.damageDealt >= state.autoShotsPerSecond) {
  //     outputState =
  //     {
  //       ...state,
  //       autoShotsPerSecond: state.autoShotsPerSecond + 1,
  //       cookies: state.cookies - state.multiplierPrice,
  //       multiplierPrice: Math.round(state.multiplierPrice * state.multiplierPriceIncrement)
  //     }
  //   }
  //   else if (action.type == 'BUY_DAMAGE_UPGRADE' && state.cookies >= state.cursorPrice) {
  //     outputState =
  //     {
  //       ...state,
  //       cursorCount: state.cursorCount + 1,
  //       cookies: state.cookies - state.cursorPrice,
  //       cursorPrice: Math.round(state.cursorPrice * state.cursorPriceIncrement)
  //     }
  //   }

  //   return outputState;
  // }

  const [state, dispatch] = useReducer(caramelReducer, initialState)

  return (
    <>
       <div className='container'>
        <div className='row justify-content-center'>
          <h1 className='col-12'>{Math.round(state.cookies)} 🍪</h1>
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_COOKIE' })}>
            <img className='img-fluid' src={torre} />
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
