import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../Resources/images/logos/manchester_city_logo.png'
import { height } from 'window-size'

export const CityLogo = props => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        background: `url(${logo}) no-repeat`
      }}
    />
  )
  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>
  } else {
    return template
  }
}