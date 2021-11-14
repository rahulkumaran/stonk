import React from 'react'
import './Slider.styles.css'
import images from './images'
import styled from 'styled-components'

const Slider = () => {
  return (
    <section>
      <article>
        <div className="bannerDiv">
          <ul className="bannerUl">
            {images.map((image, index) =>
              <li key={index}>
                <Image className="bannerImages" src={image} alt="Art Slider" />
              </li>
            )}
          </ul>
        </div>
      </article>
    </section>
  )
}

const Image = styled.img`
  @media (max-width: 530px) {
    height: 180px;
    width: 180px;
  }
`

export default Slider
