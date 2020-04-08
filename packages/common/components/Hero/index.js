import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import styles from './styles.module.scss'

const Hero = ({ title, button, onButtonClick }) => {
  let ctaButton = null

  if (button) {
    ctaButton = (
      <Button className={`mt-2 mt-lg-3 btn-lg`} onClick={() => onButtonClick()}>
        {button}
      </Button>
    )
  }

  return (
    <section id="hero" className={`mt-md-5 ${styles.heroSection}`}>
      <div className={styles.hero}>
        <h1
          className={`text-center ${styles.heroTitle}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {ctaButton}
      </div>
    </section>
  )
}

Hero.propTypes = {
  title: PropTypes.string,
  button: PropTypes.string,
  onButtonClick: PropTypes.func,
}

export default Hero
