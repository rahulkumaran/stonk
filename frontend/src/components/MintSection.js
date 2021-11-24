import React, { useEffect, useState, Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../redux/blockchain/blockchainActions'
import { fetchData } from '../redux/data/dataActions'
import metaMaskLogo from './assets/metamask.svg'
import CircularProgress from '@mui/material/CircularProgress'
import WalletIcon from './assets/wallet-solid.svg'
import { fetchSupply } from '../redux/data/supplyActions'

//const startMintingProcess = () => {}

function MintSection({ backgroundImg, location, EE }) {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const blockchain = useSelector(state => state.blockchain)
  const supply = useSelector(state => state.supply.totalSupply)
  console.log(data)
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.")
  const [claimingNft, setClaimingNft] = useState(false)
  const [mintCount, setMintCount] = useState(1)

  useEffect(
    () => {
      getData()
    },
    [blockchain.account]
  )

  var isConnected =
    blockchain.account === '' || blockchain.smartContract !== null

  const claimNFTs = _amount => {
    if (_amount <= 0) {
      return
    }
    setFeedback('Minting your Stonks...')
    setClaimingNft(true)
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: '350000',
        to: '0xf86aA85CE16A665e581405Dab0d9b526Cb46e3cE',
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((1 * _amount).toString(), 'ether')
      })
      .once('error', err => {
        console.log(err)
        setFeedback('Sorry, something went wrong please try again later.')
        setClaimingNft(false)
      })
      .then(receipt => {
        setFeedback('Congratulation, you now own a Stonks NFT!!')
        setClaimingNft(false)
        dispatch(fetchData(blockchain.account))
        dispatch(fetchSupply())
      })
  }

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
    <Wrap
      backgroundImg={backgroundImg}
      id={`${location}`}
      EE={EE}
      extendedHeight={isConnected}
    >
      <Fade in delay={300} appear>
        <Fragment>
          <ItemText>
            <h2
              style={{
                color: '#ffa500',
                animation: 'animateDown infinite 1.5s'
              }}
            >
              Mint your NFT!
            </h2>
            <br />
            <p style={{ color: '#66aff5' }}>
              Become a part of the stonk society! Lets pAmP it up!
            </p>
          </ItemText>
          <br />
          {isConnected &&
            <ConnectedP
              style={{
                color: '#ffa500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <WalletImg src={WalletIcon} alt="wallet address" />
              <Address>
                {blockchain.account}
              </Address>
            </ConnectedP>}
        </Fragment>

        <Fragment>
          {/*OPTION 1: first check if the account is connected, if yes then use supply from the data state.
        If account is not connected then pick the supply from the supply state which doesnt require wallet connection.
        If non of the above fetched the supply then show loader */}

          {/* {(blockchain.account === '' || blockchain.smartContract !== null) ?
            <H1Count>
              {data.totalSupply}/10 Minted
            </H1Count> :
            supply !== "" && supply !== null ?
              <H1Count>
                {supply}/10 Minted
            </H1Count> :
              (blockchain.account === '' || blockchain.smartContract !== null) ?
                <H1Count>
                  {data.totalSupply}/10 Minted
                  </H1Count> :
                <H1Count>
                  <CircularProgress style={{ width: '40px' }} />&nbsp;/10 Minted!
                </H1Count>
          } */}
          {/* OPTION 2 */}
          {blockchain.account === '' || blockchain.smartContract === null
            ? <H1Count>
                <CircularProgress style={{ width: '40px' }} />&nbsp;/10 Minted!
              </H1Count>
            : <H1Count>
                {data.totalSupply}/10 Minted
              </H1Count>}
          <br />
          {(blockchain.account === '' || blockchain.smartContract === null) &&
            <ConnectButton
              isConnected={
                blockchain.account === '' || blockchain.smartContract !== null
              }
              onClick={handleConnect}
            >
              <img
                src={metaMaskLogo}
                alt="metamask"
                style={{ width: '50px' }}
              />
              Connect Wallet
            </ConnectButton>}
        </Fragment>
      </Fade>
      <div />
      <Fade>
        <Fragment>
          {Number(data.totalSupply) === 6
            ? <H2>
                The sale has ended! However, you can buy from our Paintswap
                Collection!
              </H2>
            : isConnected
              ? <Fragment>
                  <ButtonsWrapper>
                    <ButtonGroup>
                      <CounterButton
                        onClick={e => {
                          if (mintCount > 1) {
                            setMintCount(mintCount - 1)
                          }
                        }}
                      >
                        -
                      </CounterButton>

                      <MintInput
                        disabled
                        onChange={e => setMintCount(e.target.value)}
                        value={mintCount}
                        style={{ paddingLeft: '85px', fontSize: '40px' }}
                      />
                      <CounterButton
                        onClick={e => {
                          if (mintCount < 5) {
                            setMintCount(mintCount + 1)
                          }
                        }}
                      >
                        +
                      </CounterButton>
                    </ButtonGroup>
                  </ButtonsWrapper>

                  <ButtonsWrapper>
                    <ButtonGroup>
                      <RightButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={e => {
                          e.preventDefault()
                          claimNFTs(mintCount)
                          getData()
                        }}
                      >
                        {claimingNft ? 'Minting......' : 'Mint Your Stonks'}
                      </RightButton>
                    </ButtonGroup>
                  </ButtonsWrapper>
                </Fragment>
              : null}
        </Fragment>
      </Fade>
    </Wrap>
  )
}

export default MintSection

// align-items is for vertical alignments
// justify-content is for horizontal alignments
// BUT if we use flex-direction: column then the above flips (becomes vice-versa)
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 110vh;
  ${props =>
    props.backgroundImg ? `background-image: url(${props.backgroundImg})` : ''};
  ${props =>
    props.EE
      ? `background-size: cover;
        background-repeat: no-repeat;`
      : ''};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid #ffa500;
`

const ItemText = styled.div`
  padding: 20px;
  padding-top: 15vh;
  line-height: 35px;
  text-align: center;
  font-size: 25px;
  @media (max-width: 768px) {
    padding: 4vh;
    font-size: 18px;
  }

  @media (max-width: 1204px) {
    max-width: 700px;
    font-size: 25px;
  }
`

const ConnectedP = styled.p`
  padding: 20px;
  line-height: 35px;
  text-align: center;
  font-size: 20px;
  @media (max-width: 768px) {
    padding: 4vh;
    font-size: 18px;
  }
`

const ButtonsWrapper = styled.div`
  /* can use these if text align center is removed in app.css for .app */
  /* display: flex;
flex-direction: column */
`

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 60px;
  margin-bottom: 60px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex: column;
  }
`

const LeftButton = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  height: 60px;
  width: 300px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  opacity: 0.85;
  text-transform: uppercase;
  font-size: 20px;
  margin: 8px;
`

const RightButton = styled(LeftButton)`
 background-color: white;
 opacity: 0.85;
 color: black;
 border: 2px solid #ffa500;

 ${props => (props.disabled ? `cursor: not-allowed; opacity: 0.4;}` : '')}

  ${props =>
    !props.disabled &&
    `&:hover{
    opacity: 0.65;
  }`}

  @media (max-width: 768px) {
    height: 60px;
    width: 250px;
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
const H1Count = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #86dc3d;
`

const H2 = styled.h2`color: #66aff5;`

const Address = styled.p`
  @media (max-width: 550px) {
    font-size: 10px;
  }
  color: white;
`
const MintInput = styled.input`
  border: 1px solid #ffa500;

  background-color: rgba(255, 215, 0, 0.2);
  width: 200px;
  height: 65px;
`

const CounterButton = styled.div`
  height: 65px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.85;
  text-transform: uppercase;
  font-size: 20px;
  opacity: 0.85;
  color: black;
  border: 2px solid #ffa500;
  background-color: white;

  ${props =>
    props.disabled ? `cursor: not-allowed; opacity: 0.4;}` : ''} ${props =>
      !props.disabled &&
      `&:hover{
    opacity: 0.65;
  };`};

  @media (max-width: 768px) {
    height: 80px;
    width: 70px;
  }
`
const WalletImg = styled.img`
  height: 40px;
  width: 60px;

  @media (max-width: 550px) {
    height: 30px;
    width: 30px;
    padding-right: 5px;
  }
`
