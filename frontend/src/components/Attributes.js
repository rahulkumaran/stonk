import React from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'


function Attributes() {
 return (
  <Container>
   <Wrap
   >
    <Fade in delay={300} appear>
     <ItemText>
      <h2 style={{ color: "#ffa500" }}>
       Check Your NFT Attributes
      </h2>
      <br />
      <p>
       Find out what common, uncommon, rare or legendary attributes your unique art is made of
      </p>
     </ItemText>
    </Fade>
    <Fade top delay={300} appear>
     <ButtonsWrapper>
      <ButtonGroup>
       <RightButton>
        Search
        </RightButton>
      </ButtonGroup>
     </ButtonsWrapper>
    </Fade>
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* ${props => props.backgroundImg ? `background-image: linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,.2)), url("images/${props.backgroundImg}")` : ''}; */
  background-color:black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ffa500;
`

const ItemText = styled.div`
  padding: 20px;
  line-height:35px;
  padding-top: 15vh;
  text-align: center;
  font-size: 25px;
  @media (max-width: 768px) {
    font-size: 18px;
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
  font-size: 20px;
  margin: 8px;
`

const RightButton = styled(LeftButton)`
 background-color: white;
 opacity: 0.85;
 color: black;
 border: 2px solid #ffa500;

 &:hover{
    opacity: 0.65;
 }
`

