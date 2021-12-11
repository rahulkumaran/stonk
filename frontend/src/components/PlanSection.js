import React, { Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'

function PlanSection({
  title,
  description,
  leftBtnText,
  rightBtnText,
  backgroundImg,
  location,
  EE
}) {
  return (
    <Wrap backgroundImg={backgroundImg} id={`${location}`} EE={EE}>
      <Fade in delay={300} appear>
        <Fragment>
          <ItemText>
            <h2
              style={{
                color: '#ffa500',
                animation: 'animateDown infinite 1.5s'
              }}
            >
              {title}
            </h2>
            <br />
            <p style={{ color: '#66aff5' }}>
              {description}
            </p>
          </ItemText>

          <Fragment>
            <br />
            <TextContainer>
              <H3>Launch Treasury Fund</H3>
              <br />
              <p>
                50% of the mint cost goes into the community treasury. The purpose of this treasury is to choose and allocate funds into secure farming/staking pools and/or other strategies to generate rewards for Stonks holders that will be airdropped each month.
              </p>
              <br />
              <br />
              <H3>Vote & Decide Allocation Strategies</H3>
              <br />

              <p>
                The power of choosing these strategies lies at the hands of all holders. At the start of each month, every Stonks holder will be eligible to vote on the proposed strategies for that month. Once the vote concludes, the team will go ahead with the strategy that has the highest votes.
              </p>
              <br />
              <br />

              <H3>Hold Stonks & Get Airdrops</H3>
              <br />

              <p>
                At the end of every month, the team will remove the treasury fund from the investments in order to airdrop the rewards from the strategies to all the holders. The airdrop you receive will be proportional to the number of Stonks you hold. The more Stonks you hold, the more you will receive from monthly airdrops!
              </p>
              <br />
              <br />

              <H3>Repeat</H3>
              <br />
              <p>
                All you need to do is hold a(or many) Stonks, tell us what to do each month and receive airdrops forever! Be a part of our Vote-Hold-Receive Airdrops-Repeat strategy!
              </p>
              <br />
              <br />
            </TextContainer>
          </Fragment>
        </Fragment>
      </Fade>
    </Wrap>
  )
}

export default PlanSection

// align-items is for vertical alignments
// justify-content is for horizontal alignments
// BUT if we use flex-direction: column then the above flips (becomes vice-versa)
const Wrap = styled.div`
  width: 100vw;
  height: auto;
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
    padding: 4vh;
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
          height: 30px;
    width: 150px;
  }
`

const TextContainer = styled.div`
  max-width: 1050px;
  margin: 0 auto;
  line-height: 35px;
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

  @media (max-width: 1204px) {
    max-width: 700px;
    font-size: 17px;
  }

  @media (max-width: 800px) {
    max-width: 600px;
    font-size: 17px;
  }

  @media (max-width: 550px) {
    max-width: 350px;
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
