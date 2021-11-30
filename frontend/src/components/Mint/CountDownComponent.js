import React from 'react'
import styled from 'styled-components'
import timer from './Timer'
import FTM from '../assets/ftm.svg'

const CountDownComponent = ({ backgroundImg, location, EE }) => {

  timer("Dec 15, 2021 15:30:00", "presale")
  timer("Dec 15, 2021 16:00:00", "publicsale")

  return (
    <Wrap
      backgroundImg={backgroundImg}
      id={`${location}`}
      EE={EE}>

      <ItemText>
        <h2
          style={{
            color: '#ffa500',
            animation: 'animateDown infinite 1.5s'
          }}
        >
          Are you ready to MINT?
       </h2>
      </ItemText>

      <ButtonsWrapper>
        <ButtonGroup>
          <BlockContainer>
            <SaleTitle>Pre Sale</SaleTitle>
            <RightButton><TimeContainer id="presale" ></TimeContainer></RightButton>
          </BlockContainer>

          <BlockContainer>
            <SaleTitle>Public Sale</SaleTitle>
            <RightButton><TimeContainer id="publicsale" ></TimeContainer></RightButton>
          </BlockContainer>
        </ButtonGroup>
      </ButtonsWrapper>

      <BottomTextContainer>
        <H2 style={{ display: "inline-flex", alignItems: "center" }}>🚀 LOAD YOUR <FTMImg src={FTM} alt="ftm" /> BAGS. LFG! 🚀</H2>
      </BottomTextContainer>


    </Wrap>
  )
}

export default CountDownComponent


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

const FTMImg = styled.img`

 height: 60px;
 width: 60px;

   @media (max-width: 500px) {
    height: 60px;
    weight: 60px;
  }
`

const BlockContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content:center;
padding-bottom: 50px;
`
const SaleTitle = styled.p`
 font-size: 25px;
 color: #66aff5;

`

const TimeContainer = styled.div`

color: black;
font-size: 30px; 

@media (max-width: 374px) {
    font-size: 25px;
  }
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

`

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 0px;
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
  flex-wrap:wrap;


  @media (max-width: 768px) {
    flex: column;
  }
`

const LeftButton = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  height: 80px;
  width: 400px;
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
 background-color: #ffa500;
 opacity: 0.85;
 color: black;
 border: 2px solid #66aff5;

 ${props => (props.disabled ? `cursor: not-allowed; opacity: 0.4;}` : '')}

  ${props =>
    !props.disabled &&
    `&:hover{
    opacity: 0.65;
  }`}

  @media (max-width: 768px) {
    height: 90px;
    width: 350px;
  }

  @media (max-width: 374px) {
    height: 90px;
    width: 300px;
  }
`

const BottomTextContainer = styled.div`
   @media (max-width: 375px) {

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

const H2 = styled.h2`color: #66aff5;
white-space: pre;
@media (max-width: 500px) {
    font-size: 18px;
  }
`

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
