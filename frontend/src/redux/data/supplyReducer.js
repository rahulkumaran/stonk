const initialState = {
  loading: false,
  contract: null,
  totalSupply: '',
  error: false,
  errorMsg: ''
}

const supplyReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'REQUEST_CONTRACT':
    case 'CHECK_SUPPLY_REQUEST':
      return {
        ...state,
        loading: true
      }

    case 'CHECK_SUPPLY_SUCCESS':
      return {
        ...state,
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

    case 'REQUEST_CONTRACT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        contract: action.payload.smartContract
      }

    case 'REQUEST_CONTRACT_FAILED':
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
