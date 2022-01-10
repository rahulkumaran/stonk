const initialState = {
  loading: false,
  ownedStonks: [],
  error: false,
  errorMsg: ''
}

const fetchStonksReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CHECK_STONKS_REQUEST':
      return {
        ...state,
        loading: true
      }

    case 'CHECK_STONKS_SUCCESS':
      return {
        ...state,
        loading: false,
        ownedStonks: action.payload.myStonksArray
      }
    case 'CHECK_STONKS_FAILED':
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload
      }

    default:
      return state
  }
}

export default fetchStonksReducer
