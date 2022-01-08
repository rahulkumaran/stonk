import React, { useEffect, Fragment } from 'react'
import styled from 'styled-components'
import StarBG from './assets/star1.gif'
import { Container } from 'react-bootstrap'
import StonkCard from '../components/card/StonkCard'

import { useDispatch, useSelector } from 'react-redux'
import { connect } from '..//redux/blockchain/blockchainActions'
import { fetchData } from '..//redux/data/dataActions'
import metaMaskLogo from './assets/metamask.svg'
import { fetchSupply } from '../redux/data/supplyActions'


const stonks = [
  { stonkId: "1" },
  { stonkId: "2" },
  { stonkId: "3" },
  { stonkId: "4" },
  { stonkId: "5" },
  { stonkId: "6" },
]


const MyStonks = () => {

  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const blockchain = useSelector(state => state.blockchain)

  useEffect(
    () => {
      getData()
    },
    [blockchain.account]
  )

  var isConnected =
    blockchain.account == '' || blockchain.smartContract !== null

  const getData = () => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account))
    }
  }

  const handleConnect = e => {
    e.preventDefault()
    if (!isConnected) {
      if (blockchain.account === '' || blockchain.smartContract === null) {
        dispatch(connect())
      }
    }
  }

  return (
    <Wrap backgroundImg={StarBG}>
      <br />
      {(blockchain.account === '' ||
        blockchain.smartContract === null) ?
        <Fragment>
          <ItemText>
            <h1 style={{ color: '#ffa500', animation: "animateDown infinite 1.5s" }}>My Stonks</h1>
            <br />
            <p>Connect your wallet</p>
          </ItemText>
          <ConnectButton
            isConnected={
              blockchain.account === '' ||
              blockchain.smartContract !== null
            }
            onClick={handleConnect}
          >
            <img
              src={metaMaskLogo}
              alt="metamask"
              style={{ width: '50px' }}
            />
                      Connect Wallet
                    </ConnectButton>

        </Fragment> :

        <Fragment>
          <ItemText>
            <h1 style={{ color: '#ffa500', animation: "animateDown infinite 1.5s" }}>My Stonks</h1>
            <br />
            <p>Owning : {stonks.length}</p>
          </ItemText>
          <Container>

            <StonkCard myStonks={stonks} />
          </Container>
        </Fragment>
      }


      <br />
      <br />
      <br />

    </Wrap>
  )
}

export default MyStonks


const Wrap = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;

 ${props =>
    props.backgroundImg
      ? `background-image: url(${props.backgroundImg})`
      : ''};
  background-color:black;

  ${props =>
    props.EE
      ? `background-size: cover;
      background-repeat: no-repeat;`
      : ''};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ffa500;
`


const ItemText = styled.div`
  padding: 15px;
  line-height: 35px;
  ${props => (!props.nftTitle ? 'padding-top: 15vh;' : 'padding-top:0;')};
  ${props => (props.nftTitle ? 'padding-bottom: 0;' : '')};
  text-align: center;
  font-size: 25px;
  @media (max-width: 768px) {
    font-size: 15px;
  }

`

const ConnectButton = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  border: ${props =>
    props.isConnected ? 'solid 1px #86dc3d;' : 'solid 1px red;'};
  height: 70px;
  width: 300px;
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