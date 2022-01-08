import React, { useState, Fragment } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'

const StonkCard = ({ myStonks }) => {

 const [show, setShow] = useState(false);
 const [activeStonk, setActiveStonk] = useState(0)


 const handleShowAttributes = (stonkId) => {

  if (!show) {
   setShow(true)
   setActiveStonk(stonkId)
  }

 }

 console.log(activeStonk)
 return (
  <Fragment>

   <Modal
    show={show}
    size="lg"
    onHide={() => setShow(false)}
    dialogClassName="modal-90w"
    fullscreen="md"
   >
    <CustomModalHeader closeButton>
     <CustomModalTitle>
      {activeStonk} <span style={{ color: "white" }}>Rarity</span>

     </CustomModalTitle>
    </CustomModalHeader>

    <ModalBody>
     <img src="/images/sliderimages/s1.png" alt="stonk" style={{ width: "350px", height: "350px", marginBottom: "30px", border: "1px solid #ffa500" }} />

     <div style={{ color: "black", marginLeft: "20px" }}>
      <P><Trait>Background:</Trait>qwertyuiopasd</P>
      <P><Trait>Arrow: </Trait>qwertyuiopasd</P>
      <P><Trait>Body:</Trait>qwertyuiopasd </P>
      <P><Trait>Suit:</Trait> qwertyuiopasd</P>
      <P><Trait>Skin Tone: </Trait>qwertyuiopasd</P>
      <P><Trait>Tie:</Trait>qwertyuiopasd</P>
      <P><Trait>Facial Hair</Trait>qwertyuiopasd</P>
      <P><Trait>Eyes/Eye-Wear</Trait></P>
      <P><Trait>Hair/Head-Wear:</Trait> qwertyuiopasd</P>
      <P><Trait>Mouth Piece:</Trait> qwertyuiopasd</P>
      <P><Trait>Earring:</Trait> qwertyuiopasd</P>
     </div>
    </ModalBody>
   </Modal>


   <Row xs={1} md={2} l={2} xl={3} className="g-5">
    {myStonks.map((_, idx) => (
     <Col>
      <CustomCard border="secondary" className="glow">
       <CardImg variant="top" src="/images/sliderImages/s6.png" />
       <Card.Body>
        <CardWrap style={{ display: "flex", justifyContent: "space-between" }}>
         <Card.Title>{_.stonkId}</Card.Title>
         <CardText>
          rarity
      </CardText>
        </CardWrap>
       </Card.Body>
       <CardFooter onClick={() => handleShowAttributes(_.stonkId)}>
        See Attributes
      </CardFooter>
      </CustomCard>
     </Col>
    ))}
   </Row>
  </Fragment >


 )
}

export default StonkCard

const CustomCard = styled(Card)`
box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px !important;
border-radius: 20px !important;
background-color: black !important;
border: 1px solid #ffa500 !important;
`

const CardImg = styled(Card.Img)`
 border-radius: 20px 20px 0 0 !important;
 border-bottom : 1px solid #ffa500 !important;
`

const CardText = styled(Card.Text)`
 color: #ffa500;
`
const CardWrap = styled.div`
display: flex;
 justifyContent: space-between;
`

const CardFooter = styled(Card.Footer)`
background-color: black;
border-radius: 0 0 20px 20px !important;
color: white !important;
text-align:center;
border-top: 1px dashed #ffa500 !important;

:hover{
 background-color: #ffa500 !important;
 opacity: 0.6 !important;
 color: rgb(102, 175, 245) !important;
}
`

const ModalBody = styled(Modal.Body)`
display: flex;
justify-content: space-between;
background-color: black !important;
border: 1px solid #ffa500;
align-items: center;


@media (max-width: 992px) {
 align-items: center;
 flex-direction:column;
}
`
const CustomModalHeader = styled(Modal.Header)`
 color: black !important;
 background: #ffa500;
 border-bottom: 1px solid black;

`
const CustomModalTitle = styled(Modal.Title)`
color: black !important;
`

const P = styled.p`
 color: white !important;
display: inline-block;
`

const Trait = styled.span`
 color: #2a9df4 !important;
`