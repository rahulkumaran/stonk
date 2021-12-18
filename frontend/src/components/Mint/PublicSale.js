import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../../redux/blockchain/blockchainActions'
import { fetchData } from '../../redux/data/dataActions'
import metaMaskLogo from '../assets/metamask.svg'
import CircularProgress from '@mui/material/CircularProgress'
import WalletIcon from '../assets/wallet-solid.svg'
import PaintSwapLogo from '../assets/paintswap.png'
import { fetchSupply } from '../../redux/data/supplyActions'

//const startMintingProcess = () => {}

function PublicSale({ backgroundImg, location, EE }) {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const blockchain = useSelector(state => state.blockchain)

  // const supply = useSelector(state => state.supply.totalSupply)

  const [feedback, setFeedback] = useState("Maybe it's your lucky day!")
  const [claimingNft, setClaimingNft] = useState(false)
  const [mintCount, setMintCount] = useState(1)

  useEffect(
    () => {
      getData()
    },
    [blockchain.account]
  )

  var isConnected =
    blockchain.account == '' || blockchain.smartContract !== null

  const claimNFTs = _amount => {
    if (_amount <= 0) {
      return
    }
    setFeedback('Minting your Stonks >>>')
    setClaimingNft(true)
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: '350000',
        to: '0xBa60457e2f458c4BFF612302Dc689F2EC07f47dC',
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((1 * _amount).toString(), 'ether')
      })
      .once('error', err => {
        setFeedback('Sorry, something went wrong. Try Again?')
        setClaimingNft(false)
      })
      .then(receipt => {
        setFeedback('Congratulation, you now own a Stonks NFT!!')
        setClaimingNft(false)
        dispatch(fetchSupply())
        dispatch(fetchData(blockchain.account))
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
    <Fragment>
      <Wrap
        backgroundImg={backgroundImg}
        id={`${location}`}
        EE={EE}
        extendedHeight={isConnected}
      >
        <Fade in delay={300}>
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
            <Text>
              If you love cool art, holding an NFT and literally letting your
              NFT work for you to receive monthly airdrops, then you'd not wanna
              miss out! Mint your Stonks now before it's too late.
      </Text>
          </ItemText>

          <h2 style={{
            color: '#ffa500',
            animation: 'blinker 1.5s linear infinite',
          }}>PUBLIC SALE</h2>

          <Fragment>
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
        </Fade>
        {blockchain.loading || data.loading
          ? 'Processing..'
          : <Fragment>
            <Fade in delay={300} appear>
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
                {blockchain.account === '' ||
                  blockchain.smartContract === null
                  ? <H1Count>
                    <CircularProgress style={{ width: '40px' }} />&nbsp;/3333
                        Minted
                      </H1Count>
                  : <H1Count>
                    {data.totalSupply}/3333 Minted
                      </H1Count>}
                <br />
                {(blockchain.account === '' ||
                  blockchain.smartContract === null) &&
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
                    </ConnectButton>}
              </Fragment>
            </Fade>
            <div />
            <Fade>
              <Fragment>
                {Number(data.totalSupply) === 3333
                  ? <Fragment>
                    <ButtonsWrapper>
                      <ButtonGroup>
                        <RightButton>
                          <img
                            src={PaintSwapLogo}
                            style={{ height: '30px', width: '30px' }}
                            alt="paintswap"
                          />&nbsp;PaintSwap
                            </RightButton>
                      </ButtonGroup>
                    </ButtonsWrapper>
                    <H2>
                      The sale has ended! However, you can buy from our
                      Paintswap Collection!
                        </H2>
                  </Fragment>
                  : isConnected
                    ? <Fragment>
                      <ButtonsWrapper>
                        <ButtonGroup>
                          <CounterButton
                            disabled={claimingNft ? 1 : 0}
                            onClick={e => {
                              if (!claimingNft) {
                                if (mintCount > 1) {
                                  setMintCount(mintCount - 1)
                                }
                              } else {
                                alert(
                                  'You already have a pending transaction. Please check metamask!'
                                )
                              }
                            }}
                          >
                            -
                              </CounterButton>

                          <MintInput
                            disabled
                            shadowInput={claimingNft ? 1 : 0}
                            onChange={e => setMintCount(e.target.value)}
                            value={mintCount}
                            style={{
                              paddingLeft: '85px',
                              fontSize: '40px'
                            }}
                          />
                          <CounterButton
                            disabled={claimingNft ? 1 : 0}
                            onClick={e => {
                              if (!claimingNft) {
                                if (mintCount < 5) {
                                  setMintCount(mintCount + 1)
                                }
                              } else {
                                alert(
                                  'You already have a pending transaction. Please check metamask!'
                                )
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
                              if (!claimingNft) {
                                e.preventDefault()
                                claimNFTs(mintCount)
                                getData()
                              } else {
                                alert(
                                  'You already have a pending transaction. Please check metamask!'
                                )
                              }
                            }}
                          >
                            {claimingNft ? 'Minting' : 'Mint Your Stonks'}
                          </RightButton>
                        </ButtonGroup>
                        <p
                          style={{ textAlign: 'center', color: '#86dc3d' }}
                        >
                          {feedback}
                        </p>
                        {feedback ===
                          'Congratulation, you now own a Stonks NFT!!' &&
                          <CheckItOut>
                            <Link to="/attributes">Check it out here!</Link>
                          </CheckItOut>}
                      </ButtonsWrapper>
                    </Fragment>
                    : null}
              </Fragment>
            </Fade>
          </Fragment>}
      </Wrap>
    </Fragment>
  )
}

export default PublicSale

// align-items is for vertical alignments
// justify-content is for horizontal alignments
// BUT if we use flex-direction: column then the above flips (becomes vice-versa)
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: auto;
  ${props =>
    props.backgroundImg ? `background-image: url(${props.backgroundImg})` : ''};

  background-color: black;

  ${props =>
    props.EE
      ? `background-size: cover;
        background-repeat: no-repeat;`
      : ''};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ffa500;
`

const ItemText = styled.div`
  padding: 20px;
  padding-top: 10vh;
  line-height: 35px;
  text-align: center;
  font-size: 25px;

  max-width: 1200px;

  @media (max-width: 1204px) {
    max-width: 700px;
    font-size: 25px;
  }
  @media (max-width: 768px) {
    padding: 4vh;
    font-size: 18px;
  }

  // @media (max-width: 768px) {
  //   padding-top: 8vh;
  //   font-size: 20px;
  // }
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
  margin-top: 0px;
  margin-bottom: 50px;
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

const CheckItOut = styled.p`
  text-align: center;
  color: #ffa500;
  line-height: 30px;
  &:hover {
    opacity: 0.65;
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
    font-size: 18px;
    max-width: 280px;
    overflow-x: scroll;
  }
  color: white;
`
const MintInput = styled.input`
  ${props => (props.shadowInput ? `opacity: 0.4;}` : '')};
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
    height: 40px;
    width: 40px;
    padding-right: 5px;
  }
`
const Text = styled.p`
  text-align: justify;
  color: #66aff5;
  @media (max-width: 550px) {
    font-size: 15px;
  }
`
