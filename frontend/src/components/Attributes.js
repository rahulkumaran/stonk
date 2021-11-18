import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import QuestionMark from '../components/assets/qm.gif'
import StarBG from './assets/star1.gif'


function Attributes() {
  const [search, setSearch] = useState("")
  const [nftData, setNftData] = useState(null)
  const [loading,setLoading]=useState(false)

  // useEffect(() => {
  //   fetch('/api/attributes/1').then(response => response.json()).then(data => {
  //     setNftData(data)
  //   })
  // }, [])

  // TODO: change range from 1-10 to 1-3333 on line 22, 33 and in backed api.
  const searchHandler =(e)=>{
    e.preventDefault()
    if(search!=="" && search>=1 && search<=10){
      setNftData(null)
      setLoading(true)
    fetch(`/api/attributes/${search}`).then(response => response.json()).then(data => {

      setTimeout(()=>{
        setNftData(data)
        setLoading(false)
      },600)
    })}
    else{
      alert("Please enter art number ranging between 1 and 10")
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
              <p>
                Find out what common, uncommon, rare or legendary attributes
                your unique art is made of
              </p>
            </ItemText>
            <ButtonsWrapper>
            <ButtonGroup>
              <SearchInput placeholder="Enter your Stonk number..." onChange={e => setSearch(e.target.value)}></SearchInput>
              <RightButton onClick={searchHandler}>Search</RightButton>
            </ButtonGroup>
          </ButtonsWrapper>
            </Fragment>
            </Fade>

            {loading && <LoadingWrapper> LOADING.... </LoadingWrapper>}
            {!loading && nftData &&
              <Fragment>
                <Fade>
                <ItemText nftTitle={true}>
                  <h2 style={{color:"#86dc3d"}}>
                    Details for Stonk #{nftData.nft_id}
                  </h2>
                </ItemText>
                </Fade>
                
                <ContentWrapper>
                <AttributesWrapper>
                  <Fade right delay={100} cascade>
                  <AttributesImageWrapper>
                    <IMG src={nftData.image_src} alt="test" style={{border: "2px solid #ffa500"}} />
                  </AttributesImageWrapper>
                  </Fade>

                  <Fade delay={800}>
                  <AttributesInfoWrapper>
                    <AttributesInfo>
                      <ul>
                        <li>
                          Edition: #{nftData.metadata.edition}
                        </li>
                        <li>
                          Edition Rarity: {nftData.metadata.editionRarity}
                        </li>
                        <li>
                          Background: {nftData.metadata.attributes[0].name} ({nftData.metadata.attributes[0].rarity})
                        </li>
                        <li>
                          Overlay Arrow: {nftData.metadata.attributes[1].name} {' '}
                          ({nftData.metadata.attributes[1].rarity})
                        </li>
                        <li>
                          Overlay Arrow: {nftData.metadata.attributes[1].name} {' '}
                          ({nftData.metadata.attributes[1].rarity})
                        </li>
                        <li>
                          Body: {nftData.metadata.attributes[2].name} {' '}
                          ({nftData.metadata.attributes[2]?.rarity})
                        </li>
                        <li>
                          Suit: {nftData.metadata.attributes[3].name} {' '}
                          ({nftData.metadata.attributes[3].rarity})
                        </li>
                        <li>
                          Skin Tone: {nftData.metadata.attributes[4].name} {' '}
                          ({nftData.metadata.attributes[4].rarity})
                        </li>
                        <li>
                          Tie: {nftData.metadata.attributes[5].name} {' '}
                          ({nftData.metadata.attributes[5].rarity})
                        </li>
                        <li>
                          Facial Hair: {nftData.metadata.attributes[6].name} {' '}
                          ({nftData.metadata.attributes[6].rarity})
                        </li>
                        <li>
                          Mouth Piece: {nftData.metadata.attributes[7].name} {' '}
                          ({nftData.metadata.attributes[7].rarity})
                        </li>
                        <li>
                          Eyes/Eye wear: {nftData.metadata.attributes[8].name} {' '}
                          ({nftData.metadata.attributes[8].rarity})
                        </li>
                        <li>
                          Earring: {nftData.metadata.attributes[9].name} {' '}
                          ({nftData.metadata.attributes[9].rarity})
                        </li>
                        <li>
                          Hair/Head Wear: {nftData.metadata.attributes[10].name} {' '}
                          ({nftData.metadata.attributes[10].rarity})
                        </li>
                      </ul>
                    </AttributesInfo>
                  </AttributesInfoWrapper>
                  </Fade>
                </AttributesWrapper>
                </ContentWrapper>
              </Fragment>}

              {!nftData && !loading &&  <ContentWrapper>
                <Fade bottom cascade>
                <IMG src={QuestionMark} alt="question mark"/>
               </Fade>
                </ContentWrapper>}       
      </Wrap>
    </Container>
  )
}

export default Attributes

const Container = styled.div`height: 100vh; `

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
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ffa500;
  
  @media (max-width: 1280px) {
    height: auto;
  }

  @media (max-width: 800px) {
    height: auto;
  }
  
  @media (max-width: 550px) {
    ${props => props.nftData ? 'height: auto;' : 'height: 100vh;'}
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
display:flex;
justify-content: center;
padding-bottom: 80px;
`

const AttributesWrapper = styled.div`
  display: flex;
  padding: 15px;

  @media (max-width: 2000px) {

  }
  
   @media (max-width: 1280px) {
   
  }
  
  @media (max-width: 800px) {
   
  }
  
  @media (max-width: 550px) {
    flex-direction:column;
    align-items: center;
    font-size: 10px;
  }
`

const AttributesImageWrapper = styled.div`justify-content: flex-start;`

const AttributesInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-left: 50px;
  line-height: 30px;
`

const AttributesInfo = styled.div`width: 100%;`

const SearchInput = styled.input`
border: 1px solid #ffa500;
border-radius: 10px;

background-color: rgba(255,215,0, 0.2);
width: 100%;
height:40px;
`
const IMG = styled.img`
 border: 2px solid #ffa500;
`

const LoadingWrapper=styled.div`
height:100vh;
display: flex;
align-items:center;
`