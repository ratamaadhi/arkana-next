const initState = {
  dataPage: null,
}

const appReducer = (state = initState, action) => {
  switch(action.type) {
    case 'GET_FIRST_ALL':
      return {
        ...state,
        dataPage: action.payload
      }
    default:
      return state;
  }
}

export default appReducer