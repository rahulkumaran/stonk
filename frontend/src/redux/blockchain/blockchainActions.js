// constants
import Web3 from "web3";
import SmartContract from "../../contracts/SmartContract.json";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  console.log("Conn_req")
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  console.log(payload)
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  console.log(payload)
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  console.log(payload)
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum?.request({
          method: "eth_requestAccounts",
        });
        const networkId = await window.ethereum?.request({
          method: "net_version",
        });
        const NetworkData = await SmartContract.networks[networkId];
        if (NetworkData) {
          const SmartContractObj = new web3.eth.Contract(
            SmartContract.abi,
            NetworkData.address
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          

          // Add listeners start
          window.ethereum?.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum?.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          alert("Please Connect To Fantom Mainnet Network! [Chain ID:250]")
          dispatch(connectFailed("Please Connect To Fantom Mainnet Network! [Chain ID:250]"));
        }
      } catch (err) {
        alert("An unexpected Error Occurred.")
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      alert("Please Install Metamask To Continue Using This Website")
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};