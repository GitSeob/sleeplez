initialState = {
  flgLogin: false,
  userid: ''
}

export default login = (state = initialState, action) => {
  switch(action.type){
    case "LOGINREQUEST" :
      console.log(action.userid)
      return({
        ...state,
        flgLogin: true,
        userid: action.userid
      })

    default:
      return state;
  }
}