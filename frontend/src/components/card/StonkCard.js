import React, { useState, Fragment } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'

const StonkCard = ({ myStonks }) => {

  const [show, setShow] = useState(false);
  const [activeStonk, setActiveStonk] = useState(0)
  const [modalData, setModalData] = useState(null)


  const handleShowAttributes = (stonkId, idx) => {
    console.log(myStonks[idx])
    const currentlyViewing = myStonks[idx]

    if (!show) {
      setShow(true)
      setActiveStonk(stonkId)
      setModalData(currentlyViewing)
    }
  }

  return (
    <Fragment>
      {modalData &&
        <Modal
          show={show}
          size="lg"
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          fullscreen="md"
        >
          <CustomModalHeader closeButton>
            <CustomModalTitle>
              Stonk #{activeStonk} <span style={{ color: "black" }}>({modalData.editionRarity})</span>

            </CustomModalTitle>
          </CustomModalHeader>

          <ModalBody>

            <Fragment>
              <img src={modalData.image} alt="stonk" style={{ width: "350px", height: "350px", marginBottom: "30px", border: "1px solid #ffa500" }} />
              <div style={{ color: "black", marginLeft: "20px" }}>
                <P><Trait>Background:</Trait> {modalData?.attributes[0].value}</P><br />
                <P><Trait>Arrow: </Trait> {modalData?.attributes[1].value}</P><br />
                <P><Trait>Body:</Trait> {modalData?.attributes[2].value} </P><br />
                <P><Trait>Suit:</Trait> {modalData?.attributes[3].value}</P><br />
                <P><Trait>Skin Tone: </Trait> {modalData?.attributes[4].value}</P><br />
                <P><Trait>Tie:</Trait> {modalData?.attributes[5].value}</P><br />
                <P><Trait>Facial Hair</Trait> {modalData?.attributes[6].value}</P><br />
                <P><Trait>Eyes/Eye-Wear</Trait> {modalData?.attributes[7].value}</P><br />
                <P><Trait>Hair/Head-Wear:</Trait> {modalData?.attributes[8].value}</P><br />
                <P><Trait>Mouth Piece:</Trait> {modalData?.attributes[9].value}</P><br />
                <P><Trait>Earring:</Trait> {modalData?.attributes[10].value}</P><br />
              </div>
            </Fragment>
          </ModalBody>
        </Modal>
      }


      <Row xs={1} md={2} l={2} xl={3} className="g-5">
        {myStonks.map((_, idx) => (
          <Col>
            <CustomCard border="secondary" className="glow">
              <CardImg variant="top" src={_.image} />
              <Card.Body>
                <CardWrap style={{ display: "flex", justifyContent: "space-between" }}>
                  <Card.Title style={{ color: "#ffa500" }}>{_.edition}</Card.Title>
                  <CardText rarity={_.editionRarity}>
                    {_.editionRarity}
                  </CardText>
                </CardWrap>
              </Card.Body>
              <CardFooter onClick={() => handleShowAttributes(_.edition, idx)}>
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
color : ${props => props.rarity && props.rarity === "common" ? "#86dc3d" : props.rarity === "uncommon" ? "#66aff5" : props.rarity === "rare" ? "#a95aec" : props.rarity === "legendary" ? "#fcc201" : ""};

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
 color: white !important;
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

const RarityText = styled.span`
color : ${props => props.rarity && props.rarity === "common" ? "#86dc3d" : props.rarity === "uncommon" ? "#66aff5" : props.rarity === "rare" ? "#a95aec" : props.rarity === "legendary" ? "#fcc201" : ""};
`