import React, { Component } from 'react'
import Stripes from '../../../Resources/images/stripes.png'
import { Tag } from '../../ui/misc'
import Reveal from 'react-reveal/Reveal'
import HomeCards from './cards'

export default class MeetPlayers extends Component {
  state = {
    show: false
  }
  render() {
    const { show } = this.state
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({
            show: true
          })
        }}
      >
        <div
          className="home_meetplayers"
          style={{
            background: `#fff url(${Stripes})`
          }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <HomeCards show={show} />
              </div>
              <div className="home_text_wrapper">
                <div>
                  <Tag
                    customStyle={{
                      background: '#0e1732',
                      fontSize: '100px',
                      color: '#fff',
                      marginBottom: '20px'
                    }}
                  >
                    Meet
                  </Tag>
                </div>
                <div>
                  <Tag
                    customStyle={{
                      background: '#0e1732',
                      fontSize: '100px',
                      color: '#fff',
                      marginBottom: '20px'
                    }}
                  >
                    The
                  </Tag>
                </div>
                <div>
                  <Tag
                    customStyle={{
                      background: '#0e1732',
                      fontSize: '100px',
                      color: '#fff',
                      marginBottom: '20px'
                    }}
                  >
                    Players
                  </Tag>
                </div>
                <div>
                  <Tag
                    customStyle={{
                      background: '#fff',
                      fontSize: '27px',
                      color: '#0e1731',
                      marginBottom: '27px',
                      border: '1px solid #0e1731'
                    }}
                    link="/the_team"
                  >
                    Meet them here
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    )
  }
}
