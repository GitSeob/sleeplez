const initialState = {
  music1: true,
  music2: false,
  music3: false,
  music4: false,
  test: 'text'
}

function setting(state = initialState, action) {
  console.log(state)
  switch(action.type){
    case 'SET_MUSIC_A':
      return ({
        ...state,
        music1: true,
        music2: false,
        music3: false,
        music4: false
      })
    case 'SET_MUSIC_B':
      return ({
        ...state,
        music1: false,
        music2: true,
        music3: false,
        music4: false
      })
    case 'SET_MUSIC_C':
      return ({
        ...state,
        music1: false,
        music2: false,
        music3: true,
        music4: false
      })
    case 'SET_MUSIC_D':
      return ({
        ...state,
        music1: false,
        music2: false,
        music3: false,
        music4: true
      })
    default:
      console.log(state)
      return state
  }
}

export default setting
