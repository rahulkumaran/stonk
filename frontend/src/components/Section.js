import React from 'react'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'

function Section({
  title,
  description,
  leftBtnText,
  rightBtnText,
  backgroundImg,
  location
}) {
  return (
    <Wrap backgroundImg={backgroundImg} id={`${location}`}>
      <Fade in delay={300} appear>
        <ItemText>
          <h2 style={{ color: '#ffa500' }}>
            {title}
          </h2>
          <br />
          <p>
            {description}
          </p>
        </ItemText>
      </Fade>
      <Fade top delay={300} appear>
        <ButtonsWrapper>
          <ButtonGroup>
            {leftBtnText &&
              <LeftButton>
                {leftBtnText}
              </LeftButton>}
            {rightBtnText &&
              <RightButton>
                {rightBtnText}
              </RightButton>}
          </ButtonGroup>
        </ButtonsWrapper>
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
  
  // background-size: cover;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-color: black;
  // ${props =>
    props.backgroundImg
      ? `background-image: linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,.2)), url("images/${props.backgroundImg}")`
      : ''};

  background-color:black;
  ${props =>
    props.backgroundImg ? `background-image: url(${props.backgroundImg})` : ''};
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
    padding-top: 8vh;
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
    flex-direction: column;
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
  border-radius: 100px;
  opacity: 0.85;
  text-transform: uppercase;
  font-size: 12px;
  margin: 8px;
`

const RightButton = styled(LeftButton)`
 background-color: white;
 opacity: 0.65;
 color: black;
`
