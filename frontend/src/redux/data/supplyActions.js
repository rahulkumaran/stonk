import store from '../store'

// check supplly
const fetchSupplyRequest = payload => {
  return {
    type: 'CHECK_SUPPLY_SUCCESS',
    payload: payload
  }
}

const fetchSupplySuccess = payload => {
  return {
    type: 'CHECK_DATA_SUCCESS',
    payload: payload
  }
}

const fetchSupplyFailed = payload => {
  return {
    type: 'CHECK_SUPPLY_FAILED',
    payload: payload
  }
}

export const fetchSupply = () => {
  return async dispatch => {
    dispatch(fetchSupplyRequest())
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call()
      //console.log(totalSupply)
      dispatch(
        fetchSupplySuccess({
          totalSupply
        })
      )
    } catch (err) {
      console.log(err)
      dispatch(fetchSupplyFailed('Could not load supply data from contract.'))
    }
  }
}
