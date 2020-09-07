// Imports
import { writeRecord } from "../storage/records";
import SleepState from "../data/SleepState";
// Actions

const ADD_SLEEP_STATE = "ADD_SLEEPSTATE";
const START_RECORD = "START_RECORD";
const STOP_RECORD = "STOP_RECORD";

// Action Creators
const stopRecord = () => {
  return {type: STOP_RECORD};
}

const startRecord = (date, sleepTime, wakeTime, coffee, exerTime, lastEat) => {
  return {type: START_RECORD, data: new Record(date, sleepTime, wakeTime, coffee, exerTime, lastEat)};
};

const addSleepState = (time,level,recordID) => {
  return {type:ADD_SLEEP_STATE, data: new SleepState(time,level,recordID)};
};

// Reducer
const reducer = (state = [], action) => {
  switch(action.type){
    case ADD_SLEEP_STATE:
      return applyAddSleepState(state,action.data);
    case START_RECORD:
      return applyStartRecord(state,action.data);
    case STOP_RECORD:
      return applyStopRecord(state,action.data);
    default:
      return state;
  }
}

// Reducer Functions

function applyAddSleepState(oldRecords, sleepState) {
  let newState = oldRecords.map(record => {
    if(record.id === sleepState.recordID){
      record.addSleepState(sleepState);
      return record;
    }else{
      return record;
    }
  });
  saveRecords(newState);
  return newState;
}
function applyStartRecord(state){
  writeRecord(state);
  return state;
}

// Exports

const actionCreators = {
  stopRecord,
  startRecord,
  addSleepState,
};
export { actionCreators };

export default reducer;
