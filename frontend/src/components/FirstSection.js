import React, { Fragment, } from 'react'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'
import Slider from './slider/Slider'
import PaintSwapLogo from './assets/paintswap.png'
import MintLogo from './assets/mint.png'

function FirstSection({
  title,
  description,
  backgroundImg,
  location,
  sellOut,
  seventyFiveSold,
  EE
}) {

  return (
    <Wrap backgroundImg={backgroundImg} EE={EE} id={`${location}`}>
      <Fade in delay={300} appear>
        <ItemText>
          <h2 style={{ color: '#ffa500', animation: "animateDown infinite 1.5s" }}>
            {/* {title} */}
            The Stonk Society
          </h2>
          <br />
          <span style={{ color: '#ffa500' }}>3333 </span>unique pieces of the Stonks Man. It is more than just an ART!
        </ItemText>
      </Fade>

      <Fade in delay={300} appear>
        <>
          <SliderWrapper>
            <Slider />
          </SliderWrapper>

          <RarityItemText>
            Hold2Earn NFTs! Just <span style={{ color: '#86dc3d' }}>Hold-</span><span style={{ color: '#66aff5' }}>Vote-</span><span style={{ color: '#a95aec' }}>Profit-</span><span style={{ color: '#fcc201' }}>Repeat</span> until stonks!

          </RarityItemText>

        </>
      </Fade>

      <Fade in delay={300} appear>
        <>

          <ButtonsWrapper>
            <ButtonGroup>
              {!sellOut &&
                <a href="#mint">
                  <RightButton><img src={MintLogo} style={{ height: "30px", width: "30px" }} alt="mint" />&nbsp;Mint Now!</RightButton>{' '}
                </a>}
              <RightButton disabled={!seventyFiveSold}>
                <img src={PaintSwapLogo} style={{ height: "30px", width: "30px" }} alt="paintswap" />&nbsp;PaintSwap</RightButton>{' '}
            </ButtonGroup>
          </ButtonsWrapper>
          {/* {!seventyFiveSold &&
          <small style={{ color: 'red', padding: '10px' }}>
            Collection will be available on PaintSwap once 2500 pieces are
            minted!
          </small>} */}
          <DownArrowWrapper>
            <DownArrow src="/images/down-arrow.svg" />
          </DownArrowWrapper>
        </>
      </Fade>
    </Wrap>
  )
}

export default FirstSection

// align-items is for vertical alignments
// justify-content is for horizontal alignments
// BUT if we use flex-direction: column then the above flips (becomes vice-versa)
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;

 ${props =>
    props.backgroundImg
      ? `background-image: url(${props.backgroundImg})`
      : ''};
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

const SliderWrapper = styled.div`width: 80vw;

@media (max-width: 1280px) {
  width: 75vw;
}

@media (max-width: 1024px) {
  width: 100vw;
}

`

const ItemText = styled.div`
  padding: 20px;
  padding-top: 15vh;
  line-height: 30px;
  text-align: center;
  font-size: 25px;
  @media (max-width: 768px) {
    padding: 0;
    padding-top: 12vh;
    font-size: 18px;
  }

  @media (max-width: 1204px) {
    max-width: 700px;
    font-size: 25px;
  }
  @media (max-width: 768px) {
    padding-top: 12vh;
    font-size: 18px;
  }


`

const RarityItemText = styled.div`
  padding: 2px;
  line-height: 30px;
  padding-top: 2vh;
  padding-bottom: 2vh;
  text-align: center;
  font-size: 22px;
  @media (max-width: 768px) {
    font-size: 18px;
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
    font-size: 16px;
    height: 50px;
    width: 170px;
  }
`

const DownArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const DownArrow = styled.img`
  height: 40px;
  animation: animateDown infinite 1.5s;
  overflow-x: hidden;
`
const ButtonsWrapper = styled.div`
  /* can use these if text align center is removed in app.css for .app */
  /* display: flex;
flex-direction: column */
`

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 40px;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: center;
    margin-bottom: 10px;
  }
`
