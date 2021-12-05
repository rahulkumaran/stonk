import React from 'react'
import styled from 'styled-components'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import teamImages from './teamImages'
import Fade from 'react-reveal/Fade';
import TwitterIcon from '../assets/twitter-brands.svg';



export default function CardComponent() {
  const team = [
    {
      name: 'Rahul',
      about: 'Full Stack Dev',
      image: `${teamImages[0]}`,
      twitter: "https://twitter.com/RahulKumaran4"
    },
    {
      name: 'Adeesh',
      about: 'Full Stack Dev',
      image: `${teamImages[1]}`,
      twitter: "https://twitter.com/_CyberHyper_"
    },
    {
      name: 'Ashar',
      about: 'Artist',
      image: `${teamImages[2]}`,
      twitter: "https://twitter.com/AzCHIT"
    },
    {
      name: 'Aaryan',
      about: 'Marketing Expert',
      image: `${teamImages[3]}`,
      twitter: "https://twitter.com/__aaryansharma"
    }
  ]

  return (<>
    {team.map((member, index) => (
      <CardWrapper key={index}>
        <Fade delay={index === 0 ? 500 : index === 1 ? 600 : index === 2 ? 700 : 800} >
          <CustomCard key={index}>
            <CardActionArea>
              <CardMedia
                component="img"
                // height="390"
                image={member.image}
                alt="green iguana"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
              <CardContent style={{ opactity: "0.7", backgroundColor: "black", borderTop: "1px solid #ffa500" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="#ffa500"
                  style={{ fontFamily: "manaspc" }}
                >
                  {member.name}
                </Typography>

                <CustomDiv>
                  <Typography variant="body2" color="white" style={{ fontFamily: "manaspc" }}
                  >
                    {member.about}
                  </Typography>
                  <a href={member.twitter} target="_blank" rel="noreferrer">
                    <TwitterDiv aria-label="twitter" >
                      <img src={TwitterIcon} alt="twitter" style={{ height: "30px", width: "30px", cursor: "pointer" }} />
                    </TwitterDiv>
                  </a>
                </CustomDiv>
              </CardContent>
            </CardActionArea>
          </CustomCard>
        </Fade>
      </CardWrapper>
    ))}
  </>)
}

const CardWrapper = styled.div`
z-index:0;
`
const CustomCard = styled(Card)`
background-color: #dedede !important;
border: 2px solid #ffa500;
margin: 20px;
height:350px;
width: 250px;

`
const CustomDiv = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
`
const TwitterDiv = styled.div`
cursor: pointer;
&:hover{
  opacity:0.65;
}
`