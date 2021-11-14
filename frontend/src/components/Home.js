import React from 'react'
import styled from 'styled-components'

import Section from './Section'
import LastSection from './LastSection'
import FirstSection from './FirstSection'

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
      <Section
        title="Treasury Management Plan"
        description="We abide by the project name, we want our society's portfolio to get StOnKs!"
        backgroundImg={StarBG}
        location="plan"
      />
      <Section
        title="Roadmap"
        description="We are ambitious!"
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
