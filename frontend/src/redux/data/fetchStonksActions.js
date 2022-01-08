import store from '../store'

const fetchDataRequest = () => {
 return {
  type: 'CHECK_DATA_REQUEST'
 }
}

const fetchDataSuccess = payload => {
 return {
  type: 'CHECK_DATA_SUCCESS',
  payload: payload
 }
}

const fetchDataFailed = payload => {
 return {
  type: 'CHECK_DATA_FAILED',
  payload: payload
 }
}

export const fetchMystonks = walletAddress => {
 return async dispatch => {
  dispatch(fetchingStonks())
  try {
   // web3 logic goes here


   dispatch(
    fetchDataSuccess({
     totalSupply
    })
   )
  } catch (err) {
   dispatch(fetchStonksFailed('Could not load data from contract.'))
  }
 }
}
