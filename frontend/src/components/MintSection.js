import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import PreSale from './Mint/PreSale'
import PublicSale from './Mint/PublicSale'
import CountDownComponent from './Mint/CountDownComponent'
import { Link, useLocation } from 'react-router-dom'
import { presaleTimestamp, publicsaleTimestamp } from './Mint/mintdates'
import timer from './Mint/Timer'



function MintSection({ backgroundImg, location, EE }) {

  const [mintPrompt, setMintPrompt] = useState(null)

  var now = new Date().getTime()
  var presaleTime = new Date(presaleTimestamp).getTime();
  var presaleIsLive = presaleTime - now < 0;

  var publicsaleTime = new Date(publicsaleTimestamp).getTime();
  var publicsaleIsLive = publicsaleTime - now < 0;

  console.log("diff---", publicsaleTime - presaleTime)
  if (!presaleIsLive) {
    console.log("timer active")
    timer(presaleTimestamp, "pass", setMintPrompt);
  } else {
    console.log("timer disabled")
  }


  let currentlocation = useLocation()

  useEffect(() => {

  }, [mintPrompt])

  return (
    <Fragment>
      {presaleIsLive && !publicsaleIsLive ?
        <PreSale backgroundImg={backgroundImg} location={location} EE={EE} /> : presaleIsLive && publicsaleIsLive ?
          <PublicSale backgroundImg={backgroundImg} location={location} EE={EE} /> : !presaleIsLive && !publicsaleIsLive && currentlocation.pathname == "/" ?
            <CountDownComponent backgroundImg={backgroundImg} location={location} EE={EE} /> : ''
      }

    </Fragment>
  )
}

export default MintSection

