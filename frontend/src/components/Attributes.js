import React, { Fragment, useState, useEffect } from 'react'
import {Navigate} from 'react-router-dom'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import QuestionMark from '../components/assets/qm.gif'
import StarBG from './assets/star1.gif'
import SearchIcon from './assets/search.png'
import {  useSelector } from 'react-redux'

function Attributes() {
  const [search, setSearch] = useState(0)
  const [nftData, setNftData] = useState(null)
  const [loading, setLoading] = useState(false)


  const supplyState = useSelector(state => state.supply)


  if(supplyState.errorMsg){
    console.count("test")
    alert(supplyState.errorMsg)
    return <Navigate to="/" />
  }

  const searchRange = parseInt(supplyState.totalSupply);
  console.log("range---", searchRange)

  const searchHandler = e => {
    e.preventDefault()
    if (search != 0 && search >= 1 && search <= searchRange) {
      setNftData(null)
      setLoading(true)
      fetch(`/api/attributes/${search}?limit=${searchRange}`)
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
            setNftData(data)
            setLoading(false)
          }, 600)
        })
    } else {
      alert(`You cannot get details for the edition that hasn't been minted yet. Please enter edition number ranging between 1 and ${searchRange}.`)
    }
  }

  return (
    <Container>
      <Wrap nftData={nftData} backgroundImg={StarBG}>
        <Fragment>
          <ItemText>
            <h2 style={{ color: '#ffa500', animation: "animateDown infinite 1.5s" }}>Check Stonks Attributes</h2>
            <br />
            <p>Find out what attributes your unique art is made of</p>
          </ItemText>
          <ButtonsWrapper>
            <ButtonGroup>
              <SearchInput
                placeholder="Enter your Stonk number..."
                onChange={e => setSearch(e.target.value)}
              />
              <RightButton onClick={searchHandler}><img src={SearchIcon} style={{ height: "25px", width: "25px" }} alt="search" />&nbsp;Search</RightButton>
            </ButtonGroup>
          </ButtonsWrapper>
        </Fragment>

        {loading && <LoadingWrapper> LOADING.... </LoadingWrapper>}
        {!loading && nftData &&
          nftData.error === null &&
          <Fragment>
            <ItemText
              nftTitle={true}
              style={{ paddingTop: '50px', paddingBottom: '30px' }}
            >
              <h2 style={{ color: '#86dc3d' }}>
                Details for Stonk #{nftData.nft_id}
              </h2>
            </ItemText>

            <ContentWrapper>
              <AttributesWrapper>
                <Fade right delay={100} cascade>
                  <AttributesImageWrapper>
                    <IMG
                      src={nftData.image_src}
                      alt="test"
                    />
                  </AttributesImageWrapper>
                </Fade>

                <Fade delay={800}>
                  <AttributesInfoWrapper>
                    <AttributesInfo>
                      <BlockWrapper flexCol={true}>
                        {/* <AttributeBlockOne>
                          <PH>Edition</PH>

                          <P>
                            {' '}#{nftData.metadata.edition}
                          </P>
                        </AttributeBlockOne>{' '} */}

                        <AttributeBlockOne>
                          <PH> Edition Rarity</PH>
                          <P rarity={nftData.metadata.editionRarity}>
                            {nftData.metadata.editionRarity}
                          </P>
                        </AttributeBlockOne>{' '}

                        <AttributeBlockOne>
                          <PH>Background</PH>
                          <P>
                            {nftData.metadata.attributes[0].value}
                          </P>
                          <P rarity={nftData.metadata.attributes[0].rarity}>
                            ({nftData.metadata.attributes[0].rarity})
                            </P>
                        </AttributeBlockOne>{' '}

                        <AttributeBlockOne>
                          <PH>Overlay Arrow</PH>
                          <P>
                            {' '}{nftData.metadata.attributes[1].value}{' '}
                          </P>
                          <P rarity={nftData.metadata.attributes[1].rarity}>
                            ({nftData.metadata.attributes[1].rarity})
                            </P>
                        </AttributeBlockOne>{' '}

                        <AttributeBlockOne>
                          <PH>Body</PH>
                          <P>
                            {nftData.metadata.attributes[2].value}
                          </P>
                          <P rarity={nftData.metadata.attributes[2]?.rarity}>
                            ({nftData.metadata.attributes[2].rarity})
                            </P>
                        </AttributeBlockOne>{' '}

                        <AttributeBlockOne>
                          <PH>Suit</PH>
                          <P> {nftData.metadata.attributes[3].value} </P>
                          <P rarity={nftData.metadata.attributes[3].rarity}>({nftData.metadata.attributes[3].rarity})</P>
                        </AttributeBlockOne>

                        <AttributeBlockOne>
                          <PH>Skin Tone</PH>
                          <P> {nftData.metadata.attributes[4].value} </P>
                          <P rarity={nftData.metadata.attributes[4].rarity}>({nftData.metadata.attributes[4].rarity})</P>
                        </AttributeBlockOne>

                        <AttributeBlockOne>
                          <PH>Tie</PH>
                          <P>{nftData.metadata.attributes[5].value}</P>
                          <P rarity={nftData.metadata.attributes[5].rarity}>({nftData.metadata.attributes[5].rarity})</P>
                        </AttributeBlockOne>

                        <AttributeBlockOne>
                          <PH>Facial Hair</PH>
                          <P>{nftData.metadata.attributes[6].value}</P>
                          <P rarity={nftData.metadata.attributes[6].rarity}>({nftData.metadata.attributes[6].rarity})</P>
                        </AttributeBlockOne>

                        <AttributeBlockOne>
                          <PH>Mouth Piece</PH>
                          <P>{nftData.metadata.attributes[7].value}</P>
                          <P rarity={nftData.metadata.attributes[7].rarity}>({nftData.metadata.attributes[7].rarity})</P>
                        </AttributeBlockOne>

                        <AttributeBlockOne>
                          <PH>Eyes/Eye wear</PH>
                          <P>{nftData.metadata.attributes[8].value}</P>
                          <P rarity={nftData.metadata.attributes[8].rarity}>({nftData.metadata.attributes[8].rarity})</P>
                        </AttributeBlockOne>

                        <AttributeBlockOne>
                          <PH>Earring</PH>
                          <P>{nftData.metadata.attributes[9].value}</P>
                          <P rarity={nftData.metadata.attributes[9].rarity}>({nftData.metadata.attributes[9].rarity})</P>
                        </AttributeBlockOne>


                        <AttributeBlockOne>
                          <PH>Hair/Head Wear</PH>
                          <P>{nftData.metadata.attributes[10].value}</P>
                          <P rarity={nftData.metadata.attributes[10].rarity}>({nftData.metadata.attributes[10].rarity})</P>
                        </AttributeBlockOne>

                      </BlockWrapper>

                    </AttributesInfo>
                  </AttributesInfoWrapper>
                </Fade>
              </AttributesWrapper>
            </ContentWrapper>
          </Fragment>}

        {!nftData && 
          !loading ?
          <ContentWrapper>
            <Fade bottom cascade>
              <QuestionMarkWrapper>
                <QM src={QuestionMark} alt="question mark" />
              </QuestionMarkWrapper>
            </Fade>
          </ContentWrapper> : nftData && nftData.error ? <h2>{nftData.error}</h2> : null}
      </Wrap>
    </Container>
  )
}

export default Attributes

const Container = styled.div`height: 100vh;`

// align-items is for vertical alignments
// justify-content is for horizontal alignments
// BUT if we use flex-direction: column then the above flips (becomes vice-versa)
const Wrap = styled.div`
  width: 100vw;
  height: ${props => props.nftData ? "auto;" : "100vh;"};
  ${props =>
    props.backgroundImg ? `background-image: url(${props.backgroundImg})` : ''};
  // background-color:black;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ffa500;

  @media (max-width: 1280px) {
    ${props => (props.nftData ? 'height: auto;' : 'height: 100vh;')};
  }

  @media (max-width: 1024px) {
    ${props => (props.nftData ? 'height: auto;' : 'height: 100vh;')};
  }

  @media (max-width: 800px) {
    ${props => (props.nftData ? 'height: auto;' : 'height: 100vh;')};
  }

  @media (max-width: 550px) {
    ${props => (props.nftData ? 'height: auto;' : 'height: 100vh;')};
  }
`

const ItemText = styled.div`
  padding: 15px;
  line-height: 35px;
  ${props => (!props.nftTitle ? 'padding-top: 15vh;' : 'padding-top:0;')};
  ${props => (props.nftTitle ? 'padding-bottom: 0;' : '')};
  text-align: center;
  font-size: 25px;
  @media (max-width: 768px) {
    font-size: 15px;
  }

`

const ButtonsWrapper = styled.div`
  /* can use these if text align center is removed in app.css for .app */
  /* display: flex;
flex-direction: column */

  max-width: 1050px;
  margin: 0 auto;

  @media (max-width: 2000px) {
    max-width: 1300px;
    font-size: 22px;
  }

  @media (max-width: 1280px) {
    max-width: 1050px;
    font-size: 18px;
  }

  @media (max-width: 800px) {
    max-width: 600px;
    font-size: 17px;
  }

  @media (max-width: 550px) {
    max-width: 300px;
    font-size: 15px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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

const ContentWrapper = styled.div`
  max-width: 1300px;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  /* padding-left: 100px; */

  @media (max-width: 1204px) {
    padding-bottom: 0px;
  }
`

const AttributesWrapper = styled.div`
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;

  @media (max-width: 2000px) {
  }

  @media (max-width: 1204px) {
    flex-direction: column;
    align-items: center;
    font-size: 10px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    font-size: 10px;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: center;
    font-size: 10px;
  }
`

const AttributesImageWrapper = styled.div`
justify-content: flex-start;
padding-left: 70px;

@media (max-width: 1204px) {
  padding:0;
  }
`

const AttributesInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* padding-left: 50px; */
  line-height: 30px;

  @media (max-width: 550px) {
    padding: 0;
    justify-content: flex-end;
    justify-content: center;
  }

`

const AttributesInfo = styled.div`
  width: 100%;
  display: flex;

`

const SearchInput = styled.input`
  border: 1px solid #ffa500;
  border-radius: 10px;

  background-color: rgba(255, 215, 0, 0.2);
  width: 250px;
  height: 40px;
`
const IMG = styled.img`border: 2px solid #ffa500;


@media (min-width: 1700px) {
  width: 450px;
  height: 450px;
}

@media (max-width: 1280px) {
  width: 350px;
  height: 350px;
}

@media (max-width: 800px) {
  width: 250px;
  height: 300px;
}
`
const QM = styled.img`
  border: 2px solid #ffa500;
  width: 250px;
  height: 300;

  @media (max-width: 1280px) {
    width: 250px;
    height: 250px;
  }
`

const LoadingWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`

const QuestionMarkWrapper = styled.div`padding-top: 70px;`

const AttributeBlockOne = styled.div`
  // background-color: rgba(255,215,0, 0.2);
  min-width: 200px;
  height: 80x;
  width: 200px;
  padding: 15px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  opacity: 0.85;
  text-transform: uppercase;
  font-size: 20px;
  margin: 8px;
  border: 2px solid #ffa500;
  line-height: 25px;


  ${props =>
    !props.disabled &&
    `&:hover{
    opacity: 0.65;
  }`};

  @media (max-width: 550px) {
      min-width:0;
      width: 1px;
    }
`
const BlockWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  justify-content: center;

/* 
  @media (max-width: 550px) {
  ${props => (props.flexCol ? "flex-wrap:wrap; align-items:center; justify-content:center;" : '')};
  
} */

`

const P = styled.p`
  color: white;
  font-size: 15px;
  text-align: center;

  color : ${props => props.rarity && props.rarity === "common" ? "#86dc3d" : props.rarity === "uncommon" ? "#66aff5" : props.rarity === "rare" ? "#a95aec" : props.rarity === "legendary" ? "#fcc201" : ""};

  @media (max-width: 550px) {
    font-size: 12px;
  }
`
const PH = styled.p`
  color: #ffa500;
  font-size: 15px;

  @media (max-width: 550px) {
    font-size: 12px;
  }
`
