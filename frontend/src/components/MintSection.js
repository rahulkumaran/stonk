import React, { Fragment } from 'react'
import styled from 'styled-components'
import PreSale from './Mint/PreSale'
import PublicSale from './Mint/PublicSale'
import CountDownComponent from './Mint/CountDownComponent'
import { Link, useLocation } from 'react-router-dom'


function MintSection({ backgroundImg, location, EE }) {
  let currentlocation = useLocation()

  const isPresaleActive = false;
  const salesActive = false;


  return (
    <Fragment>
      {salesActive && isPresaleActive ?
        <PreSale backgroundImg={backgroundImg} location={location} EE={EE} /> : salesActive && !isPresaleActive ?
          <PublicSale backgroundImg={backgroundImg} location={location} EE={EE} /> : !salesActive && !isPresaleActive && currentlocation.pathname == "/" ?
            <CountDownComponent backgroundImg={backgroundImg} location={location} EE={EE} /> : ''
      }

    </Fragment>
  )
}

export default MintSection

