import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

function Card({
  handleClick,
  flipped,
  back,
  front,
  height,
  width,
}) {
  return (
    <div
      className={`flip-container ${flipped ? 'flipped' : ''}`}
      style={{
        width,
        height,
      }}
      onClick={handleClick}
    >
      <div className='flipper'>
        <img
          alt='card'
          className={flipped ? 'front' : 'back'}
          src={flipped ? front : back}
          style={{ width, height }}
        />
      </div>
    </div>
  )
}

Card.propTypes = {
  flipped: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  back: PropTypes.string.isRequired,
  front: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Card
