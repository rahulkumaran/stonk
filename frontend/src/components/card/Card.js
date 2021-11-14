import React from 'react'
import styled from 'styled-components'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Paper from '@mui/material/Paper'
import teamImages from './teamImages'



export default function CardComponent() {
  const team = [
    {
      name: 'Rahul Whale',
      about: 'Full Stack Engeinner',
      image: `${teamImages[0]}`
    },
    {
      name: 'CyberHyper',
      about: 'Full Stack Engineer',
      image: `${teamImages[1]}`
    },
    {
      name: 'Ashar',
      about: 'Artiist',
      image: `${teamImages[2]}`
    },
    {
      name: 'Blaze',
      about: 'Marketing Expert | Social Engineer',
      image: `${teamImages[3]}`
    }
  ]

  return ( <>
    { team.map((member, index) => (
      <CustomCard sx={{ maxWidth: 345 }} hoverable key={index}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="390"
          image={member.image}
          alt="green iguana"
        />
        <CardContent style={{opactity:"0.7", backgroundColor:"black", borderTop: "1px solid #ffa500"}}>
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

    ))}
  </>)
}

const CustomCard = styled(Card)`
background-color: #dedede !important;
border: 2px solid #ffa500;
margin: 20px;
width: 600px;

&:hover{
 opacity: 0.7
}
`
