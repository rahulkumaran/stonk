const initialState = {
  loading: false,
  totalSupply: '',
  error: false,
  errorMsg: ''
}

const supplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_SUPPLY_REQUEST':
      return {
        ...initialState,
        loading: true
      }

    case 'CHECK_SUPPLY_SUCCESS':
      return {
        ...initialState,
        loading: false,
        totalSupply: action.payload.totalSupply
      }
    case 'CHECK_SUPPLY_FAILED':
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

export default supplyReducer
