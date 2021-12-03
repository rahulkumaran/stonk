import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import PreSale from './Mint/PreSale'
import PublicSale from './Mint/PublicSale'
import CountDownComponent from './Mint/CountDownComponent'
import { Link, useLocation } from 'react-router-dom'
import { presaleTimestamp, publicsaleTimestamp } from './Mint/mintdates'
import timer from './Mint/Timer'



function MintSection({ backgroundImg, location, EE }) {

  const [presaleMintPrompt, setPresaleMintPrompt] = useState(null)
  const [publicSaleMintPrompt, setPublicsaleMintPrompt] = useState(null)

  const timerDisabled = false
  var publicsaleIsLive
  var presaleIsLive

  // use timer feature based on flag
  if (!timerDisabled) {
    var now = new Date().getTime()
    var presaleTime = new Date(presaleTimestamp).getTime();
    presaleIsLive = presaleTime - now < 0;

    var publicsaleTime = new Date(publicsaleTimestamp).getTime();
    publicsaleIsLive = publicsaleTime - now < 0;

    if (!presaleIsLive) {
      timer(presaleTimestamp, "pass", setPresaleMintPrompt);
    } else {
      // console.log("mint section presale timer disabled")
    }

    if (!publicsaleIsLive) {
      timer(publicsaleTimestamp, "pass", setPublicsaleMintPrompt);
    } else {
      // console.log("mint section - publicsale timer disabled")
    }
  } else {
    // console.log("mint section - timer feature disabled")

    // to show mint section by default
    presaleIsLive = true
    publicsaleIsLive = true
  }


  let currentlocation = useLocation()

  useEffect(() => {

  }, [presaleMintPrompt, publicSaleMintPrompt])


  const showPresale = () => {
    return <PreSale backgroundImg={backgroundImg} location={location} EE={EE} />
  }

  const showPublicSale = () => {
    return <PublicSale backgroundImg={backgroundImg} location={location} EE={EE} />
  }

  const showCountdown = () => {
    return <CountDownComponent backgroundImg={backgroundImg} location={location} EE={EE} />

  }

  return (
    <Fragment>
      {presaleIsLive && !publicsaleIsLive ? showPresale()
        : presaleIsLive && publicsaleIsLive ?
          showPublicSale() : !presaleIsLive && !publicsaleIsLive && currentlocation.pathname == "/" ?
            showCountdown() : <h1>OOPS! There was some problem! Please refresh.</h1>
      }

    </Fragment>
  )
}

export default MintSection

