import React, { useEffect, useState, Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../redux/blockchain/blockchainActions'
import { fetchData } from '../redux/data/dataActions'

//const startMintingProcess = () => {}

function Section({
  title,
  description,
  leftBtnText,
  rightBtnText,
  backgroundImg,
  location,
  EE
}) {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  console.log(data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Stonks...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "350000",
        to: "0xf86aA85CE16A665e581405Dab0d9b526Cb46e3cE",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((1 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Congratulation, you now own a Stonks NFT!!"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <Wrap backgroundImg={backgroundImg} id={`${location}`} EE={EE}>
      <Fade in delay={300} appear>
        <Fragment>
          <ItemText>
            <h2 style={{ color: '#ffa500' }}>Mint your Meme Man!</h2>
            <br />
            <p style={{ color: '#66aff5' }}>
              Become a part of the stonk society! Lets pAmP it up!
            </p>
            <br />
            {blockchain.account === '' || blockchain.smartContract === null
              ? <p style={{ color: '#66aff5' }}>
                  You are not connected to your wallet currently.
                </p>
              : <p style={{ color: '#66aff5' }}>
                  You are connected with Wallet Address :{' '}
                  <span style={{ color: '#ffa500' }}>{blockchain.account}</span>
                </p>
            }
            <br />
            {blockchain.account === '' || blockchain.smartContract === null
              ? <h2 style={{ color: '#66aff5' }}>
                  /10 Minted!
                </h2>
              : 
                <h2 style={{ color: '#66aff5' }}>
                  {data.totalSupply}/10 Minted
                </h2>}
          </ItemText>
        </Fragment>
      </Fade>
      <Fade top delay={300} appear>
        
            {Number(data.totalSupply) === 6 ?
              <h2 style={{ color: '#66aff5' }}>
                The sale has ended! However, you can buy from our Paintswap Collection!
              </h2>
            : 
              <ButtonsWrapper>
                <ButtonGroup>
                  <RightButton
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      claimNFTs(1);
                      getData();
                    }}
                  >
                  {claimingNft ? "Minting......" : "Mint Your Stonks"}
                  </RightButton>
                </ButtonGroup>
              </ButtonsWrapper>
            }
          
        
      </Fade>
    </Wrap>
  )
}

export default Section

// align-items is for vertical alignments
// justify-content is for horizontal alignments
// BUT if we use flex-direction: column then the above flips (becomes vice-versa)
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  ${props =>
    props.backgroundImg ? `background-image: url(${props.backgroundImg})` : ''};
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
  padding: 20px;
  padding-top: 15vh;
  line-height: 35px;
  text-align: center;
  font-size: 25px;
  @media (max-width: 768px) {
    padding: 8vh;
    font-size: 20px;
  }
`

const ButtonsWrapper = styled.div`
  /* can use these if text align center is removed in app.css for .app */
  /* display: flex;
flex-direction: column */
`

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: center;

  @media (max-width: 768px) {
    flex: column;
  }
`

const LeftButton = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  height: 40px;
  width: 256px;
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
          height: 30px;
    width: 150px;
  }
`

const TextContainer = styled.div`
  max-width: 1050px;
  margin: 0 auto;
  line-height: 25px;
  font-size: 20px;
  text-align: justify;

  @media (max-width: 2000px) {
    max-width: 1300px;
    font-size: 22px;
    line-height: 25px;
  }

  @media (max-width: 1280px) {
    max-width: 1050px;
    font-size: 18px;
    line-height: 22px;
  }

  @media (max-width: 800px) {
    max-width: 600px;
    font-size: 17px;
  }

  @media (max-width: 550px) {
    max-width: 300px;
    font-size: 15px;
    line-height: 20px;
  }
`

const H3 = styled.h3`
  color: #86dc3d;

  &:after {
    content: "";
    display: block;
    height: 2px;
    width: 4rem;
    background: orange;
    margin: 10px 0;
  }
`

const H3P = styled.h3`
  color: #86dc3d;

  &:after {
    content: "";
    display: block;
    height: 2px;
    width: 10rem;
    background: orange;
    margin: 10px 0;
    margin-left: -23px;
  }

  @media (max-width: 550px) {
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
