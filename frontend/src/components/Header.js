import React, { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import metaMaskLogo from './assets/metamask.svg';
import ArrowLogo from './assets/ArrowLogo.png';
import twitterLogo from '../components/assets/twitter.jpg'
import discordLogo from '../components/assets/discord.jpg'
import Web3 from 'web3';
import { ethers } from 'ethers';

const WalletCard = () => {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect');
  const [isConnected, setIsConnected] = useState(false);


  const connectWalletHandler = async () => {

    if (window.ethereum && window.ethereum.isMetaMask) {
      // console.log('MetaMask Here!');
      const account = await window.ethereum.request({ method: 'eth_accounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      parseInt(chainId, 16);
      //console.log(setCurrentChainID(() => parseInt(chainId, 16)));
      if (chainId != 250) {
        alert('Please connect to Fantom Network!')
      } else {
        window.ethereum?.request({ method: 'eth_requestAccounts' })
          .then(result => {
            accountChangedHandler(result[0]);
            setIsConnected(true);
            setConnButtonText(account[0]?.substring(0, 4) + "___" + account[0]?.substring(38, 42));
            // console.log(account[0]);
          })
          .catch(error => {
            alert(error.message);

          });
      }

    } else {
      // console.log('Need to install MetaMask');
      alert('Please install MetaMask browser extension to interact');
    }
  }

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
  }

  // const getAccountBalance = (account) => {
  //   window.ethereum?.request({ method: 'eth_getBalance', params: [account, 'latest'] })
  //     .then(balance => {
  //       setUserBalance(ethers.utils.formatEther(balance));
  //     })
  //     .catch(error => {
  //       alert(error.message);
  //     });
  // };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  }


  // listen for account changes
  window.ethereum?.on('accountsChanged', accountChangedHandler);

  window.ethereum?.on('chainChanged', chainChangedHandler);

  return (
    <ConnectButton onClick={connectWalletHandler} class="walletButton" isConnected={isConnected}>
      <img
        src={metaMaskLogo}
        alt="metamask"
        style={{ height: '50px', width: '30px' }}
      />
      {connButtonText}
    </ConnectButton>
  );
}

function Header() {

  let location = useLocation();

  return (
    <Container>

      {location.pathname == "/" ?
        <Fragment>
          <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span>Stonk</span> <img style={{ height: "30px", width: "30px", position: "relative", marginBottom: "10px", marginLeft: "4px" }} src={ArrowLogo} alt="logo" />
            {''}<span>Society</span>
          </a>
          <Menu>
            <Link to="/attributes">Attributes</Link>
            <a href="/#mint">Mint</a>
            <a href="/#roadmap">Roadmap</a>
            <a href="/#plan">Plan</a>
            <a href="/#team">Team</a>
          </Menu></Fragment> :
        <Fragment>
          <Link to="/" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span>Stonk</span> <img style={{ height: "30px", width: "30px", position: "relative", marginBottom: "10px", marginLeft: "4px" }} src={ArrowLogo} alt="logo" />
            {''}<span>Society</span>
          </Link>
          <Menu>
            <Link to="/">Back to Home</Link>
          </Menu>
        </Fragment>
      }
      <RightMenu>
      <SocialsWrapper>
          <SocialAnchor href="#" target="_blank">
            <img
              src={twitterLogo}
              alt="twitter"
              style={{ height: '40px', width: '40px' }}
            />
          </SocialAnchor>
          <SocialAnchor href="#" target="_blank">
            <img
              src={discordLogo}
              alt="discord"
              style={{ height: '40px', width: '40px' }}
            />
          </SocialAnchor>
        </SocialsWrapper>
        <WalletCard />
      </RightMenu>
    </Container>
  );
}

export default (Header)


const Container = styled.div`
  min-height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.9);
  // rgba(255, 165, 0, 0.2
  opacity: 0.9;
  z-index: 1;
  border-bottom: 1px solid #ffa500;

  /* giving header the full width of the app */
  top: 0;
  left: 0;
  right: 0;

  a{
    font-weight: 1000;
    text-transform: uppercase;
    color: white;

  }
`

const SocialsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    display: none;
  }
`

const SocialAnchor = styled.a`
  &:hover {
    opacity: 0.5;
  }
`


const Menu = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;

  a {
    font-weight: 1000;
    text-transform: uppercase;
    margin-right: 10px;
    padding: 0 20px;
    color: white;


    &:hover{
      color: #ffa500;

    }
  }

  @media (max-width: 768px) {
    a {
      display: none;
    }
  }
`

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    font-weight: 1000;
    text-transform: uppercase;
    padding: 0 10px;
    flex-wrap: nowrap;
  }
`
const ConnectButton = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  border: ${props => props.isConnected ? 'solid 1px #86dc3d;' : 'solid 1px red;'}
  height: 40px;
  width: 145px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  opacity: 0.85;
  text-transform: uppercase;
  font-size: ${props => !props.isConnected ? '20px;' : '15px;'}
  margin: 8px;

  &:hover{
      opacity:0.65;
  }
`
