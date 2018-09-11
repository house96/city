import React from 'react'
import { Tag } from '../../ui/misc'
import Blocks from './Blocks'

const MatchesHome = () => {
  const style = {
    background: '#0e1731',
    fontSize: '50px',
    color: '#fff'
  }
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag customStyle={style}>Matches</Tag>
        <Blocks />
        <Tag
          customStyle={{
            background: '#fff',
            fontSize: '22px',
            color: '#0e1731'
          }}
          link="/THE_TEAM"
        >
          See more matches
        </Tag>
      </div>
    </div>
  )
}

export default MatchesHome
