import * as types from './actionTypes'

export const increamentDay = day => {
  return {
    type: types.INCREMENT_DAY
  }
}

export const decreamentDay = day => {
  return {
    type: types.DECREMENT_DAY
  }
}

export function monthIncrement() {
  return {
    type: types.MONTHINCREMENT
  }
}

export function monthDecrement() {
  return {
    type: types.MONTHDECREMENT
  }
}

export function requestSolution() {
  return {
    type: types.REQUESTSOLUTION
  }
}

export function getSolution() {
  return {
    type: types.GETSOLUTION
  }
}

export function changeSerAlarm() {
  return {
    type: types.CHANGESETALARM
  }
}

export function setSoundA() {
  return {
    type: types.SET_SOUND_A
  }
}
export function setSoundB() {
  return {
    type: types.SET_SOUND_B
  }
}
export function setSoundC() {
  return {
    type: types.SET_SOUND_C
  }
}
export function setSoundD() {
  return {
    type: types.SET_SOUND_D
  }
}

export function setcheckSleep() {
  return {
    type: types.SETCHECKSLEEP
  }
}

export function setWakeTimeA() {
  return {
    type: types.SET_WAKETIME_A
  }
}
export function setWakeTimeB() {
  return {
    type: types.SET_WAKETIME_B
  }
}
export function setWakeTimeC() {
  return {
    type: types.SET_WAKETIME_C
  }
}
export function setWakeTimeD() {
  return {
    type: types.SET_WAKETIME_D
  }
}
export function setWakeTimeE() {
  return {
    type: types.SET_WAKETIME_E
  }
}

export function setCheckGyzo(){
  return{
    type: types.SETCHECKGYRO
  }
}

export function setCheckSound(){
  return{
    type: types.SETCHECKSOUND
  }
}

export function setAlarmTime() {
  return {
    type: types.SETALARMTIME
  }
}

export const requestLogin = userid => {
  return({
    type: types.LOGINREQUEST,
    userid: userid
  })
}