import React from 'react'
import styled from 'styled-components'
import timer from './Timer'
import FTM from '../assets/ftm.svg'
import { presaleTimestamp, publicsaleTimestamp } from './mintdates'

const CountDownComponent = ({ backgroundImg, location, EE }) => {
  timer(presaleTimestamp, 'mintpresale')
  timer(publicsaleTimestamp, 'mintpublicsale')

  return (
    <Wrap backgroundImg={backgroundImg} id={`${location}`} EE={EE}>
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
            <RightButton>
              <TimeContainer id="mintpresale" />
            </RightButton>
          </BlockContainer>

          <BlockContainer>
            <SaleTitle>Public Sale</SaleTitle>
            <RightButton>
              <TimeContainer id="mintpublicsale" />
            </RightButton>
          </BlockContainer>
        </ButtonGroup>
      </ButtonsWrapper>

      <BottomTextContainer>
        <H2 style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span style={{ animation: 'rocket  infinite 5s', color: '#ffa500' }}>
            🚀{' '}
          </span>
          LOAD YOUR <FTMImg src={FTM} alt="ftm" /> BAGS. LFG!{' '}
          <span style={{ animation: 'rocket  infinite 5s', color: '#ffa500' }}>
            🚀
          </span>
        </H2>
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
  justify-content: center;
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



const ButtonsWrapper = styled.div``

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 0px;
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

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

const BottomTextContainer = styled.div`@media (max-width: 375px) {}`


const H2 = styled.h2`
  color: #66aff5;
  white-space: pre;

  @media (max-width: 550px) {
    font-size: 16px;
    max-width: 350px;
  }
`

