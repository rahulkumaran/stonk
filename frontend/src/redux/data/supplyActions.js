import store from '../store'
import Web3 from 'web3'
import SmartContract from '../../contracts/TTTTTT.json'

// check supplly
const fetchSupplyRequest = payload => {
  return {
    type: 'CHECK_SUPPLY_REQUEST'
  }
}

const fetchSupplySuccess = payload => {
  return {
    type: 'CHECK_SUPPLY_SUCCESS',
    payload: payload
  }
}

const fetchSupplyFailed = payload => {
  return {
    type: 'CHECK_SUPPLY_FAILED',
    payload: payload
  }
}

// contract

const requestContract = () => {
  return {
    type: 'REQUEST_CONTRACT'
  }
}

const requestContractSuccess = payload => {
  return {
    type: 'REQUEST_CONTRACT_SUCCESS',
    payload: payload
  }
}

const requestContractFailed = payload => {
  return {
    type: 'REQUEST_CONTRACT_FAILED',
    payload: payload
  }
}

export const fetchSupply = () => {
  return async dispatch => {
    dispatch(fetchSupplyRequest())
    try {
      let totalSupply = await store
        .getState()
        .supply.contract.methods.totalSupply()
        .call()
      dispatch(
        fetchSupplySuccess({
          totalSupply
        })
      )
    } catch (err) {
      console.log(err)
      dispatch(
        fetchSupplyFailed(
          'Oops! looks like there was a problem. Make sure you have Metamask installed before you proceed. Please refresh the page in case you already have it installed to retry.'
        )
      )
    }
  }
}

export const fetchContract = () => {
  return async dispatch => {
    dispatch(requestContract())
    try {
      const { ethereum } = window
      let web3 = new Web3(ethereum)

      const SmartContractObj = new web3.eth.Contract(
        SmartContract,
        '0xf86aA85CE16A665e581405Dab0d9b526Cb46e3cE'
      )
      dispatch(
        requestContractSuccess({
          smartContract: SmartContractObj,
          web3: web3
        })
      )
    } catch (err) {
      console.log(err)
      dispatch(requestContractFailed('Something went wrong!'))
    }
  }
}
