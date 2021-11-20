import React from 'react'
import styled from 'styled-components'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import teamImages from './teamImages'
import Fade from 'react-reveal/Fade';


export default function CardComponent() {
  const team = [
    {
      name: 'Rahul Whale',
      about: 'Full Stack Dev',
      image: `${teamImages[0]}`
    },
    {
      name: 'CyberHyper',
      about: 'Full Stack Dev',
      image: `${teamImages[1]}`
    },
    {
      name: 'Ashar',
      about: 'Artist',
      image: `${teamImages[2]}`
    },
    {
      name: 'Blaze',
      about: 'Marketing Expert',
      image: `${teamImages[3]}`
    }
  ]

  return (<>
    {team.map((member, index) => (
      <Fade direction={index % 2 === 0 ? "left" : "right"} delay={index === 0 ? "500" : index === 1 ? "600" : index === 2 ? "700" : "800"} cascade>
        <CustomCard sx={{ maxWidth: 345 }} key={index}>
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
              >
                {member.name}
              </Typography>
              <Typography variant="body2" color="white">
                {member.about}
              </Typography>
            </CardContent>
          </CardActionArea>
        </CustomCard>
      </Fade>


    ))}
  </>)
}

const CustomCard = styled(Card)`
background-color: #dedede !important;
border: 2px solid #ffa500;
margin: 20px;
height:330px;
width: 250px;


&:hover{
 opacity: 0.7
}
`
