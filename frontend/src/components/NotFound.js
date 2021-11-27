import React from 'react'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'
import StarBG from './assets/star1.gif'

function NotFound() {
  return (
    <Wrap backgroundImg={StarBG}>
      <Fade in delay={300} appear>
        <ItemText>
          <h1 style={{ color: '#ffa500' }}>404: Page Not Found!</h1>
        </ItemText>
      </Fade>
    </Wrap>
  )
}

export default NotFound

// align-items is for vertical alignments
// justify-content is for horizontal alignments
// BUT if we use flex-direction: column then the above flips (becomes vice-versa)
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  ${props =>
    props.backgroundImg ? `background-image: url(${props.backgroundImg})` : ''};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ffa500;

  @media (max-width: 768px) {
    height: auto;
  }

  @media (max-width: 1280px) {
    height: auto;
  }
`

const ItemText = styled.div`
  padding: 20px;
  padding-top: 15vh;
  line-height: 35px;
  text-align: center;
  font-size: 25px;

  @media (max-width: 1204px) {
    max-width: 700px;
    font-size: 25px;
  }

  @media (max-width: 768px) {
    padding-top: 8vh;
    font-size: 18px;
  }
`
