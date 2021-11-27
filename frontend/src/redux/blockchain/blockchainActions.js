import Web3 from 'web3'
import SmartContract from '../../contracts/test_contract.json'

import { fetchData } from '../data/dataActions'

const connectRequest = () => {
  console.log('Conn_req')
  return {
    type: 'CONNECTION_REQUEST'
  }
}

const connectSuccess = payload => {
  console.log(payload)
  return {
    type: 'CONNECTION_SUCCESS',
    payload: payload
  }
}

const connectFailed = payload => {
  console.log(payload)
  return {
    type: 'CONNECTION_FAILED',
    payload: payload
  }
}

const updateAccountRequest = payload => {
  console.log(payload)
  return {
    type: 'UPDATE_ACCOUNT',
    payload: payload
  }
}

export const disconnect = () => {
  return {
    type: 'DISCONNECT'
  }
}

export const connect = () => {
  return async dispatch => {
    dispatch(connectRequest())
    const { ethereum } = window
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask

    if (metamaskIsInstalled) {
      let web3 = new Web3(ethereum)
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        })
        const networkId = await ethereum.request({
          method: 'net_version'
        })

        if (networkId == 0xfa2) {
          const SmartContractObj = new web3.eth.Contract(
            SmartContract,
            '0x4Cf054A9BF7b0f17dd6ac913C5f66E3fE976Baa9'
          )
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3
            })
          )

          // Add listeners start
          ethereum.on('accountsChanged', accounts => {
            dispatch(updateAccount(accounts[0]))
          })
          ethereum.on('chainChanged', () => {
            window.location.reload()
          })
          // Add listeners end
        } else {
          alert('Please Connect To Fantom Mainnet Network! [Chain ID:250]')
          dispatch(
            connectFailed(
              'Please Connect To Fantom Mainnet Network! [Chain ID:250]'
            )
          )
        }
      } catch (err) {
        alert('An unexpected Error Occurred.')
        dispatch(connectFailed('Something went wrong.'))
      }
    } else {
      alert('Please Install Metamask on your device.')
      dispatch(connectFailed('Install Metamask.'))
    }
  }
}

export const updateAccount = account => {
  return async dispatch => {
    dispatch(updateAccountRequest({ account: account }))
    dispatch(fetchData(account))
  }
}
