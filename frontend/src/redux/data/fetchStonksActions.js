import store from '../store'

const fetchStonksRequest = () => {
 return {
  type: 'CHECK_STONKS_REQUEST'
 }
}

const fetchStonksSuccess = payload => {
 return {
  type: 'CHECK_STONKS_SUCCESS',
  payload: payload
 }
}

const fetchStonksFailed = payload => {
 return {
  type: 'CHECK_STONKS_FAILED',
  payload: payload
 }
}


export const fetchMystonks = (stonksFromWallet) => {
 return async dispatch => {
  dispatch(fetchStonksRequest())
  try {
   let stonkIds = stonksFromWallet

   fetch('/serve/attributes/show-my-stonks', {
    method: 'POST',

    body: JSON.stringify({
     ownedStonks: stonkIds
    }),

    headers: {
     'Content-type': 'application/json; charset=UTF-8'
    }
   }).then(res => res.json()).then(send =>
    dispatch(
     fetchStonksSuccess({
      ...send
     })
    )
   )
    .catch(err => console.log(err))


  } catch (err) {
   dispatch(fetchStonksFailed('Something went wrong. Could not get your stonks.'))
  }
 }
}
