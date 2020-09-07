import moment from 'moment'

let initialState = {
  day: "2018-10-19",
  month: "2018-10"
}

export default satatistic = (state = initialState, action) => {
  switch(action.type){
    case 'INCREMENT_DAY':
      console.log('select in');
      return ({
        day: moment(state.day).add(1,'days').format('YYYY-MM-DD')
      })
    case 'DECREMENT_DAY':
      console.log('select de')
      return ({
        day: moment(state.day).subtract(1,'days').format('YYYY-MM-DD')
      })

    case 'MONTHINCREMENT':
      console.log('inc Month')
      return ({
        month: moment(state.month).add(1, 'months').format('YYYY-MM')
      })

    case 'MONTHDECREMENT':
      console.log('dec Month')
      return ({
        month: moment(state.month).subtract(1, 'months').format('YYYY-MM')
      })
      
    default:
      // console.log(state)
      return state

  }
}
