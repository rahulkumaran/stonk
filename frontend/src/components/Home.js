import React from 'react'
import styled from 'styled-components'

import MintSection from './MintSection'
import LastSection from './LastSection'
import FirstSection from './FirstSection'
import RoadmapSection from './RoadmapSection'
import PlanSection from './PlanSection'

import StarBG from '../components/assets/star1.gif'

function Home({ BG, EE }) {
  return (
    <Container>
      <FirstSection
        backgroundImg={BG !== '' ? BG : StarBG}
        EE={EE}
        sellOut={false}
        seventyFiveSold={false}
      />
      <MintSection
        backgroundImg={BG !== '' ? BG : StarBG}
        location="mint"
        EE={EE}
      />
      <PlanSection
        title="Treasury Management Plan"
        description="It's Stonks for all!"
        backgroundImg={BG !== '' ? BG : StarBG}
        location="plan"
        EE={EE}
      />
      <RoadmapSection
        title="Roadmap"
        description="We are gonna make it!"
        backgroundImg={BG !== '' ? BG : StarBG}
        location="roadmap"
        EE={EE}
      />
      <LastSection
        backgroundImg={BG !== '' ? BG : StarBG}
        location="team"
        EE={EE}
      />
    </Container>
  )
}

export default Home

const Container = styled.div`height: 100vh;`
