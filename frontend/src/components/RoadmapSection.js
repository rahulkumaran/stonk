import React, { Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import styled from 'styled-components'
import Medium from './assets/medium.svg'

function RoadmapSection({
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
          <br />
          <CenterLine>
            <Fragment>
              <TextContainer>
                <Fade right>
                  <RightPhasesWrapper>
                    <div>
                      <H3P>Phase 0</H3P>
                      <br />
                      <p
                        style={{
                          maxWidth: '500px',
                          border: '1px solid #ffa500',
                          padding: '15px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255,215,0, 0.2)'
                        }}
                      >
                        The community will be at the heart of The Stonk Society
                        project! Even before launch, we will ensure that we
                        build a soid community.
                      </p>
                    </div>
                  </RightPhasesWrapper>
                </Fade>

                <br />
                <br />

                <Fade left>
                  <LeftPhasesWrapper>
                    <div>
                      <H3P leftPhase={true}>Phase 1</H3P>
                      <br />
                      <p
                        style={{
                          maxWidth: '500px',
                          border: '1px solid #ffa500',
                          padding: '15px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255,215,0, 0.2)'
                        }}
                      >
                        Once we have a solid community, our next aim will be to
                        launch our collection and push for a sell-out, so that
                        our community’s interests can be protected in the
                        secondary markets. We will also be working with
                        Paintswap during this phase to get our collection
                        whitelisted.
                      </p>
                    </div>
                  </LeftPhasesWrapper>
                </Fade>
                <br />
                <br />

                <Fade right>
                  <RightPhasesWrapper>
                    <div>
                      <H3P>Phase 2</H3P>
                      <br />
                      <p
                        style={{
                          maxWidth: '500px',
                          border: '1px solid #ffa500',
                          padding: '15px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255,215,0, 0.2)'
                        }}
                      >
                        Get holders on the Discord server verified and award
                        special roles to holders that will grant them access to
                        “Top Secret” channels to discuss Investment Strategies
                        on our Discord server.
                      </p>
                    </div>
                  </RightPhasesWrapper>
                </Fade>
                <br />
                <br />

                <Fade left>
                  <LeftPhasesWrapper>
                    <div>
                      <H3P leftPhase={true}>Phase 3</H3P>
                      <br />
                      <p
                        style={{
                          maxWidth: '500px',
                          border: '1px solid #ffa500',
                          padding: '15px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255,215,0, 0.2)'
                        }}
                      >
                        After sell-out, we will be rolling out our Hold2Earn
                        feature. Read more about this in our Medium article.
                      </p>
                    </div>
                  </LeftPhasesWrapper>
                </Fade>
                <br />
                <br />

                <Fade right>
                  <RightPhasesWrapper>
                    <div>
                      <H3P>Phase 4</H3P>
                      <br />
                      <p
                        style={{
                          maxWidth: '500px',
                          border: '1px solid #ffa500',
                          padding: '15px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255,215,0, 0.2)'
                        }}
                      >
                        Secret Features.....Ssshhhhhh! Stay Tuned on our discord
                        to stay updated!
                      </p>
                    </div>
                  </RightPhasesWrapper>
                </Fade>
                <br />
              </TextContainer>
            </Fragment>
          </CenterLine>

          <TextContainer>
            <br />
            <br />
            <p style={{ color: '#66aff5' }}>
              Please read the Medium article to understand the micro-goals that
              will be achieved during Phase 0 and Phase 1.
            </p>
            <br />
            <ButtonsWrapper>
              <ButtonGroup>
                <a
                  href="https://medium.com/@thestonksociety"
                  target="_blank"
                  rel="noreferrer"
                >
                  <RightButton>
                    <MediumIcom src={Medium} alt="medium" />&nbsp;Medium
                  </RightButton>
                </a>
              </ButtonGroup>
            </ButtonsWrapper>
          </TextContainer>
        </Fragment>
      </Fade>
    </Wrap>
  )
}

export default RoadmapSection

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
    height: 50px;
    width: 200px;
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

  @media (max-width: 1204px) {
    // max-width: 600px;
    font-size: 17px;
  }

  @media (max-width: 820px) {
    max-width: 600px;
    font-size: 17px;
  }

  @media (max-width: 550px) {
    max-width: 300px;
    font-size: 15px;
    line-height: 20px;
  }
`

const H3P = styled.h3`
  color: #86dc3d;
  line-height: 0;

  ${props => (props.leftPhase ? `float: right;` : '')};

  @media (max-width: 1024px) {
    float: none;
  }
`
const RightPhasesWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  &:before {
    content: "";
    display: block;
    height: 2px;
    width: 1.5rem;
    background: orange;
    margin: 80px 0;
  }
  @media (max-width: 2000px) {
    &:before {
      content: "";
      display: block;
      height: 2px;
      width: 9rem;
      background: orange;
      margin: 80px 0;
    }
  }
  @media (max-width: 1280px) {
    &:before {
      content: "";
      display: block;
      height: 2px;
      width: 1.5rem;
      background: orange;
      margin: 80px 0;
    }
  }

  @media (max-width: 1024px) {
    justify-content: flex-start;
    &:after {
      display: none;
    }

    &:before {
      content: "";
      display: block;
      height: 2px;
      width: 1.5rem;
      background: orange;
      margin: 80px 0;
    }
  }
`
const LeftPhasesWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  &:after {
    content: "";
    display: block;
    height: 2px;
    width: 1.5rem;
    background: orange;
    margin: 80px 0;
  }

  @media (max-width: 2000px) {
    &:after {
      content: "";
      display: block;
      height: 2px;
      width: 9rem;
      background: orange;
      margin: 80px 0;
    }
  }

  @media (max-width: 1280px) {
    &:after {
      content: "";
      display: block;
      height: 2px;
      width: 1.5rem;
      background: orange;
      margin: 80px 0;
    }
  }
  @media (max-width: 1024px) {
    &:after {
      display: none;
    }

    &:before {
      content: "";
      display: block;
      height: 2px;
      width: 1.5rem;
      background: orange;
      margin: 80px 0;
    }
  }
`

const CenterLine = styled.div`
  background-image: linear-gradient(#ec9f05, #ff4e00);
  background-size: 2px 100%;
  background-repeat: no-repeat;
  background-position: center center;

  @media (max-width: 1024px) {
    background-image: linear-gradient(#ec9f05, #ff4e00);
    background-size: 2px 100%;
    background-repeat: no-repeat;
    background-position: left;
  }
`
const MediumIcom = styled.img`
  height: 40px;
  width: 40px;
`
