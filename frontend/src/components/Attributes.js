import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import QuestionMark from '../components/assets/qm.gif'
import StarBG from './assets/star1.gif'

function Attributes() {
  const [search, setSearch] = useState('')
  const [nftData, setNftData] = useState(null)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   fetch('/api/attributes/1').then(response => response.json()).then(data => {
  //     setNftData(data)
  //   })
  // }, [])

  // TODO: change range from 1-10 to 1-3333 on line 22, 33 and in backed api.
  const searchHandler = e => {
    e.preventDefault()
    if (search !== '' && search >= 1 && search <= 10) {
      setNftData(null)
      setLoading(true)
      fetch(`/api/attributes/${search}`)
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
            setNftData(data)
            setLoading(false)
          }, 600)
        })
    } else {
      alert('Please enter art number ranging between 1 and 10')
    }
    console.log(search)
  }
  return (
    <Container>
      <Wrap nftData={nftData} backgroundImg={StarBG}>
        <Fade in delay={300} appear>
          <Fragment>
            <ItemText>
              <h2 style={{ color: '#ffa500' }}>Check Stonks Attributes</h2>
              <br />
              <p>Find out what attributes your unique art is made of</p>
            </ItemText>
            <ButtonsWrapper>
              <ButtonGroup>
                <SearchInput
                  placeholder="Enter your Stonk number..."
                  onChange={e => setSearch(e.target.value)}
                />
                <RightButton onClick={searchHandler}>Search</RightButton>
              </ButtonGroup>
            </ButtonsWrapper>
          </Fragment>
        </Fade>

        {loading && <LoadingWrapper> LOADING.... </LoadingWrapper>}
        {!loading &&
          nftData &&
          <Fragment>
            <Fade>
              <ItemText
                nftTitle={true}
                style={{ paddingTop: '50px', paddingBottom: '30px' }}
              >
                <h2 style={{ color: '#86dc3d' }}>
                  Details for Stonk #{nftData.nft_id}
                </h2>
              </ItemText>
            </Fade>

            <ContentWrapper>
              <AttributesWrapper>
                <Fade right delay={100} cascade>
                  <AttributesImageWrapper>
                    <IMG
                      src={nftData.image_src}
                      alt="test"
                      style={{ border: '2px solid #ffa500' }}
                    />
                  </AttributesImageWrapper>
                </Fade>

                <Fade delay={800}>
                  <AttributesInfoWrapper>
                    <AttributesInfo>
                      <BlockWrapper flexCol={true}>
                        <BlockDiv>
                          <AttributeBlockOne>
                            <PH>Edition</PH>

                            <P>
                              {' '}#{nftData.metadata.edition}
                            </P>
                          </AttributeBlockOne>{' '}

                          <AttributeBlockOne>
                            <PH> Edition Rarity</PH>
                            <P rarity={nftData.metadata.editionRarity}>
                              {nftData.metadata.editionRarity}
                            </P>
                          </AttributeBlockOne>{' '}

                          <AttributeBlockOne>
                            <PH>Background</PH>
                            <P>
                              {nftData.metadata.attributes[0].name}
                            </P>
                            <P rarity={nftData.metadata.attributes[0].rarity}>
                              ({nftData.metadata.attributes[0].rarity})
                            </P>
                          </AttributeBlockOne>{' '}

                          <AttributeBlockOne>
                            <PH>Overlay Arrow</PH>
                            <P>
                              {' '}{nftData.metadata.attributes[1].name}{' '}
                            </P>
                            <P rarity={nftData.metadata.attributes[1].rarity}>
                              ({nftData.metadata.attributes[1].rarity})
                            </P>
                          </AttributeBlockOne>{' '}

                          <AttributeBlockOne> 
                          <PH>Body</PH>
                            <P>
                            {nftData.metadata.attributes[2].name}
                            </P>
                            <P rarity={nftData.metadata.attributes[2]?.rarity}>
                            ({nftData.metadata.attributes[2]?.rarity})
                            </P>
                            </AttributeBlockOne>{' '}
                        </BlockDiv>

                        <BlockDiv>
                          <AttributeBlockOne> 
                            <PH>Suit</PH>
                            <P> {nftData.metadata.attributes[3].name} </P>
                            <P rarity={nftData.metadata.attributes[3].rarity}>({nftData.metadata.attributes[3].rarity})</P>
                          </AttributeBlockOne>

                          <AttributeBlockOne> 
                            <PH>Skin Tone</PH>
                            <P> {nftData.metadata.attributes[4].name} </P>
                            <P rarity={nftData.metadata.attributes[4].rarity}>({nftData.metadata.attributes[4].rarity})</P>
                          </AttributeBlockOne>

                          <AttributeBlockOne> 
                            <PH>Tie</PH>
                            <P>{nftData.metadata.attributes[5].name}</P>
                            <P rarity={nftData.metadata.attributes[5].rarity}>({nftData.metadata.attributes[5].rarity})</P>
                          </AttributeBlockOne>

                          <AttributeBlockOne> 
                          <PH>Facial Hair</PH> 
                            <P>{nftData.metadata.attributes[6].name}</P>
                            <P rarity={nftData.metadata.attributes[6].rarity}>({nftData.metadata.attributes[6].rarity})</P>
                          </AttributeBlockOne>

                          <AttributeBlockOne>
                            <PH>Mouth Piece</PH>
                            <P>{nftData.metadata.attributes[7].name}</P>
                            <P rarity={nftData.metadata.attributes[7].rarity}>({nftData.metadata.attributes[7].rarity})</P>
                          </AttributeBlockOne>
                        </BlockDiv>

                        <BlockDiv>
                          <AttributeBlockOne> 
                            <PH>Eyes/Eye wear</PH>
                            <P>{nftData.metadata.attributes[8].name}</P>
                            <P rarity={nftData.metadata.attributes[8].rarity}>({nftData.metadata.attributes[8].rarity})</P>
                          </AttributeBlockOne>
                          
                          <AttributeBlockOne>
                            <PH>Earring</PH>
                            <P>{nftData.metadata.attributes[9].name}</P>
                            <P rarity={nftData.metadata.attributes[9].rarity}>({nftData.metadata.attributes[9].rarity})</P>
                          </AttributeBlockOne>


                          <AttributeBlockOne>
                            <PH>Hair/Head Wear</PH>
                            <P>{nftData.metadata.attributes[10].name}</P>
                            <P rarity={nftData.metadata.attributes[10].rarity}>({nftData.metadata.attributes[10].rarity})</P>
                          </AttributeBlockOne>

                        </BlockDiv>
                      </BlockWrapper>
                     
                    </AttributesInfo>
                  </AttributesInfoWrapper>
                </Fade>
              </AttributesWrapper>
            </ContentWrapper>
          </Fragment>}

        {!nftData &&
          !loading &&
          <ContentWrapper>
            <Fade bottom cascade>
              <QuestionMarkWrapper>
                <QM src={QuestionMark} alt="question mark" />
              </QuestionMarkWrapper>
            </Fade>
          </ContentWrapper>}
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
  height: 100vh;
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
    height: 100vh;
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
  display: flex;
  justify-content: center;
  padding-bottom: 20px;

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

const AttributesImageWrapper = styled.div`justify-content: flex-start;
`

const AttributesInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-left: 50px;
  line-height: 30px;

  @media (max-width: 550px) {
    padding: 0;
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
  width: 100%;
  height: 40px;
`
const IMG = styled.img`border: 2px solid #ffa500;


@media (max-width: 1204px) {
  width: 350px;
  height: 350px;
}

@media (max-width: 800px) {
  width: 300px;
  height: 300px;
}
`
const QM = styled.img`
  border: 2px solid #ffa500;
  width: 300px;
  height: 300;
`

const LoadingWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`

const QuestionMarkWrapper = styled.div`padding-top: 70px;`
const AttributeBlockOne = styled.div`
  // background-color: rgba(255,215,0, 0.2);
  height: 80px;
  width: 200px;
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
`
const BlockWrapper = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 550px) {
  ${props => (props.flexCol ? "flex-direction:column; align-items:center; justify-content:center;" : '')};
  
}

`

const BlockDiv = styled.div`

`

const P = styled.p`
  color: white;
  font-size: 15px;
  color : ${props => props.rarity && props.rarity ==="common" ? "#86dc3d" : props.rarity ==="uncommon" ? "#66aff5" : props.rarity === "rare" ? "#a95aec" : props.rarity === "legendary" ? "#fcc201" : "" }
`
const PH = styled.p`
  color: white;
  font-size: 15px;
`
