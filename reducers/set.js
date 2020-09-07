// import * as types from '../actions/actionTypes'

let initialState = {
  isSound1: false,
  isSound2: true,
  isSound3: false,
  isSound4: false,
  isTime1: false,
  isTime2: false,
  isTime3: true,
  isTime4: false,
  isTime5: false,
  gyzo: true,
  soundCheck: false,
}

export default set = (state = initialState, action) => {
  switch(action.type){
    case 'SET_SOUND_A':
      console.log('select 1');
      return ({
        ...state,
        test: '1',
        isSound1: true,
        isSound2: false,
        isSound3: false,
        isSound4: false
      })
    case 'SET_SOUND_B':
    console.log('select 2')
      return ({
        ...state,
        test: '2',
        isSound1: false,
        isSound2: true,
        isSound3: false,
        isSound4: false
      })
    case 'SET_SOUND_C':
    console.log(state)
      return ({
      test: '3',
      isSound1: false,
      isSound2: false,
      isSound3: true,
      isSound4: false
    })
    case 'SET_SOUND_D':
      console.log('select 4')
      return ({
        ...state,
        isSound1: false,
        isSound2: false,
        isSound3: false,
        isSound4: true
      })
    case 'SET_WAKETIME_A':
      return({
        ...state,
        isTime1: true,
        isTime2: false,
        isTime3: false,
        isTime4: false,
        isTime5: false
      })
    case 'SET_WAKETIME_B':
      return({
        ...state,
        isTime1: false,
        isTime2: true,
        isTime3: false,
        isTime4: false,
        isTime5: false
      })
    case 'SET_WAKETIME_C':
      return({
        ...state,
        isTime1: false,
        isTime2: false,
        isTime3: true,
        isTime4: false,
        isTime5: false
      })
    case 'SET_WAKETIME_D':
      return({
        ...state,
        isTime1: false,
        isTime2: false,
        isTime3: false,
        isTime4: true,
        isTime5: false
      })
    case 'SET_WAKETIME_E':
      return({
        ...state,
        isTime1: false,
        isTime2: false,
        isTime3: false,
        isTime4: false,
        isTime5: true
      })
    case 'SETCHECKGYRO':
      return({
        ...state,
        gyzo: true,
        soundCheck: false
      })
    case 'SETCHECKSOUND':
      return({
        ...state,
        gyzo: false,
        soundCheck: true
      })
    default:
      // console.log('default')
      return state
  }
}
