import React from 'react'
import { Link } from 'react-router-dom'

export const Tag = ({ link, customStyle, children }) => {
  const template = (
    <div
      style={{
        ...customStyle,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous'
      }}
    >
      {children}
    </div>
  )
  return link ? <Link to={link}>{template}</Link> : template
}

export const firebaseLooper = snapshot => {
  const data = []
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    })
  })
  return data
}

export const reverseArray = array => array.reverse()
