import React from 'react'
import styled from 'styled-components'

import Section from './Section'
import LastSection from './LastSection'
import FirstSection from './FirstSection'
import RoadmapSection from './RoadmapSection'
import PlanSection from './PlanSection'

import StarBG from '../components/assets/star1.gif'

function Home() {
  return (
    <Container>
      <FirstSection
        backgroundImg={StarBG}
        sellOut={false}
        seventyFiveSold={false}
      />
      <Section
        title="Mint your Meme Man!"
        description="Become a part of the stonk society! Lets pAmP it up!"
        backgroundImg={StarBG}
        location="mint"
      />
      <PlanSection
        title="Treasury Management Plan"
        description="Aiming for the moon. Slowly but surely!"
        backgroundImg={StarBG}
        location="plan"
      />
      <RoadmapSection
        title="Roadmap"
        description="We are gonna make it!"
        backgroundImg={StarBG}
        location="roadmap"
      />
      <LastSection
        title="Team"
        description="We are one among you. Together with you, we make the Stonk Society!"
        backgroundImg={StarBG}
        location="team"
      />
    </Container>
  )
}

export default Home

const Container = styled.div`height: 100vh;`
