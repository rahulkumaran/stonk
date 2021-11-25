import React, { Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'
import poweredBy from '../components/assets/powered-by-fantom.png'
import CardComponent from '../components/card/Card'
import twitterLogo from '../components/assets/twitter.jpg'
import discordLogo from '../components/assets/discord.jpg'

function LastSection({ title, description, backgroundImg, location, EE }) {
  return (
    <Wrap backgroundImg={backgroundImg} id={`${location}`} EE={EE}>
      <Fade in delay={300} appear>
        <ItemText>
          <h1
            style={{ color: '#ffa500', animation: 'animateDown infinite 1.5s' }}
          >
            Team
          </h1>
          <br />
          <p style={{ color: '#66aff5' }}>
            We are one among you. Together with you, we make the Stonk Society!
          </p>
        </ItemText>

        <CardWrapper>
          <CardComponent />
        </CardWrapper>

        <Wrapper>
          <img
            src={poweredBy}
            alt="fantom"
            style={{ width: '350px', marginTop: '10px' }}
          />
        </Wrapper>

        <SocialsWrapper>
          <SocialAnchor
            href="https://twitter.com/FTMStonkSociety/"
            target="_blank"
          >
            <img
              src={twitterLogo}
              alt="twitter"
              style={{ height: '50px', width: '50px' }}
            />
          </SocialAnchor>
          <SocialAnchor href="https://discord.gg/9CubZShGJv" target="_blank">
            <img
              src={discordLogo}
              alt="discord"
              style={{ height: '50px', width: '50px' }}
            />
          </SocialAnchor>
        </SocialsWrapper>
      </Fade>
    </Wrap>
  )
}

export default LastSection

const Wrapper = styled.div`
  margin-bottom: 15px;
  border-top: 1px solid #ffa500;

  @media (max-width: 375px) {
    width: auto;
  }
`
const SocialsWrapper = styled.div`
  margin-bottom: 15px;
  width: 200px;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 375px) {
    width: 200px;
  }
`

// align-items is for vertical alignments
// justify-content is for horizontal alignments
// BUT if we use flex-direction: column then the above flips (becomes vice-versa)
const Wrap = styled.div`
  width: 100vw;
  height: auto;
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

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1204px) {
    max-width: 600px;
    font-size: 25px;
  }

  @media (max-width: 760px) {
    flex-direction: column;
  }
`

const SocialAnchor = styled.a`
  &:hover {
    opacity: 0.5;
  }
`
