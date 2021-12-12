import React, { useEffect, useState, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import CloseIcon from '@material-ui/icons/Close'
import StarBG from './assets/star1.gif'
import metaMaskLogo from './assets/metamask.svg'
import ArrowLogo from './assets/ArrowLogo.png'
import twitterLogo from '../components/assets/twitter.jpg'
import discordLogo from '../components/assets/discord.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { connect, disconnect } from '../redux/blockchain/blockchainActions'
import { fetchData } from '../redux/data/dataActions'

//ds
const WalletCard = () => {
  // const [userBalance, setUserBalance] = useState(null)
  const [connButtonText, setConnButtonText] = useState('Connect')
  const dispatch = useDispatch()
  const blockchain = useSelector(state => state.blockchain)
  // const data = useSelector(state => state.data)
  const account = blockchain.account
  useEffect(
    () => {
      if (blockchain.account !== '' && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account))

        if (account) {
          setConnButtonText(
            account.substring(0, 4) + '___' + account.substring(38, 42)
          )
        } else {
          setConnButtonText('Connect')
          dispatch(disconnect())
        }
      }
    },
    [blockchain.smartContract, blockchain.account, dispatch, account]
  )

  //setConnButtonText(data.name?.substring(0, 4) + "___" + data.name?.substring(38, 42));

  const handleConnectClick = e => {
    e.preventDefault()
    if (blockchain.account === '' || blockchain.smartContract === null) {
      dispatch(connect())
    } else {
      if (account) {
        alert(
          `You are already connected with wallet ${account}. If you wish to change it please use metamask.`
        )
      } else {
        dispatch(connect())
      }
    }
  }

  return (
    <ConnectButton
      isConnected={
        account &&
        (blockchain.account === '' || blockchain.smartContract !== null)
      }
      onClick={handleConnectClick}
    >
      <img
        src={metaMaskLogo}
        alt="metamask"
        style={{ height: '50px', width: '30px' }}
      />
      {connButtonText}
    </ConnectButton>
  )
}

function Header({ handleEasterEgg }) {
  let location = useLocation()
  const [burgerOpen, setBurgerOpen] = useState(false)
  const [colorChange, setColorchange] = useState(false)

  const changeNavbarColor = () => {
    if (window.scrollY >= 60) {
      setColorchange(true)
    } else {
      setColorchange(false)
    }
  }

  window.addEventListener('scroll', changeNavbarColor)

  const toggleBurger = () => {
    setBurgerOpen(!burgerOpen)
  }

  return (
    <Container showNav={colorChange}>
      {location.pathname === '/'
        ? <Fragment>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: '#ffa500' }}>Stonk</span>{' '}
            <img
              style={{
                height: '30px',
                width: '30px',
                position: 'relative',
                marginBottom: '10px',
                marginLeft: '4px'
              }}
              src={ArrowLogo}
              alt="logo"
              onClick={handleEasterEgg}
            />
            {''}
            <span style={{ color: '#66aff5' }}>Society</span>
          </a>
          <Menu showNav={colorChange}>
            <Link to="/attributes">Attributes</Link>
            <a href="/#mint">Mint</a>
            <a href="/#plan">Plan</a>
            <a href="/#roadmap">Roadmap</a>
            <a href="/#team">Team</a>
          </Menu>
        </Fragment>
        : <Fragment>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: '#ffa500' }}>Stonk</span>{' '}
            <img
              style={{
                height: '30px',
                width: '30px',
                position: 'relative',
                marginBottom: '10px',
                marginLeft: '4px'
              }}
              src={ArrowLogo}
              alt="logo"
            />
            {''}
            <span style={{ color: '#66aff5' }}>Society</span>
          </Link>
          <Menu showNav={colorChange}>
            <Link to="/">Back to Home</Link>
          </Menu>
        </Fragment>}
      <RightMenu>
        <SocialsWrapper>
          <SocialAnchor
            href="https://twitter.com/FTMStonkSociety/"
            target="_blank"
          >
            <img
              src={twitterLogo}
              alt="twitter"
              style={{ height: '40px', width: '40px' }}
            />
          </SocialAnchor>
          <SocialAnchor href="https://discord.gg/9CubZShGJv" target="_blank">
            <img
              src={discordLogo}
              alt="discord"
              style={{ height: '40px', width: '40px' }}
            />
          </SocialAnchor>
        </SocialsWrapper>
        {/* <WalletCard /> */}
        {location.pathname === '/'
          ? <CustomMenuWrapper>
            <CustomMenu onClick={toggleBurger} />{' '}
          </CustomMenuWrapper>
          : <Link to="/" style={{ padding: '0' }}>
            <HomeWrapper>
              <Home />
            </HomeWrapper>
          </Link>}
      </RightMenu>

      {location.pathname === '/' &&
        <BurgerNav show={burgerOpen}>
          <CustomCloseWrapper>
            <CustomClose onClick={toggleBurger} />
          </CustomCloseWrapper>

          <Fragment>
            <li onClick={toggleBurger}>
              <Link to="/attributes">Attributes</Link>
            </li>
            <li onClick={toggleBurger}>
              <a href="/#mint">Mint</a>
            </li>
            <li onClick={toggleBurger}>
              <a href="/#plan">Plan</a>
            </li>
            <li onClick={toggleBurger}>
              <a href="/#roadmap">Roadmap</a>
            </li>
            <li onClick={toggleBurger}>
              <a href="/#team">Team</a>
            </li>
          </Fragment>
        </BurgerNav>}
    </Container>
  )
}

export default Header

const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  min-height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: ${props =>
    props.showNav
      ? 'rgba(0, 0, 0, 0.9);   border-bottom: 1px solid #ffa500;'
      : ''};
  /* opacity: 0.9; */
  z-index: 1;

  /* giving header the full width of the app */
  top: 0;
  left: 0;
  right: 0;

  a {
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
    color: white;
    font-weight: 1000;
    font-size: ${props => (props.showNav ? '' : '23px !important;')};
    // color: ${props => (props.showNav ? 'white' : '#ffa500;')};

    text-transform: uppercase;
    margin-right: 10px;
    padding: 0 20px;

    &:hover {
      color: #ffa500;
    }
  }

  @media (max-width: 1279px) {
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
  border: ${props =>
    props.isConnected ? 'solid 1px #86dc3d;' : 'solid 1px red;'};
  height: 40px;
  width: 145px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  opacity: 0.85;
  text-transform: uppercase;
  font-size: ${props => (!props.isConnected ? '20px;' : '15px;')};
  margin: 8px;

  &:hover {
    opacity: 0.65;
  }
`
const CustomMenuWrapper = styled.div`
  padding: 4px;
  border: 1px solid #ffa500;
  border-radius: 5px;

  @media (min-width: 1280px) {
    display: none !important;
  }

  @media (max-width: 400px) {
    padding: 0;
    border: none;
  }
`

const CustomMenu = styled(MenuIcon)`
  cursor: pointer;

  @media (min-width: 1280px) {
    display: none !important;
  }
`

const HomeWrapper = styled.div`
display: flex:
padding-right: 10px;

`
const Home = styled(HomeIcon)`
  cursor: pointer;

  @media (min-width: 1280px) {
    display: none !important;
  }
`
const BurgerNav = styled.div`
  height: 100vh;
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  ${props =>
    props.backgroundImg
      ? `background-image: url(${props.backgroundImg})`
      : `background-color: black;`};
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;
  transform: ${props => (props.show ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.2s ease-in;
  border-left: 1px solid #ffa500;
  z-index: 9999;

  li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    a {
      font-weight: 1000;

      &:hover {
        color: #ffa500;
      }
    }

    &:after {
      content: "";
      display: block;
      height: 2px;
      width: 4rem;
      background: orange;
      margin: 10px 0;
    }
  }
`

const CustomCloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CustomClose = styled(CloseIcon)`
cursor: pointer;
`
