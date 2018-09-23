import React, { Component } from 'react'
import PlayerCard from '../../components/home/meetPlayers/card'
import Fade from 'react-reveal/Fade'
import Stripes from '../../Resources/images/stripes.png'
import { firebasePlayers, firebase } from '../../firebase'
import { firebaseLooper } from '../../components/ui/misc'

export default class TheTeam extends Component {
  state = {
    loading: true,
    players: []
  }

  componentDidMount() {
    firebasePlayers.once('value').then(snapshot => {
      const players = firebaseLooper(snapshot)
      let promises = []
      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref('players')
              .child(players[key].image)
              .getDownloadURL()
              .then(url => {
                players[key].url = url
                resolve()
              })
          })
        )
      }
      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          players
        })
      })
    })
  }
  showplayersByCategory = category => {
    return this.state.players
      ? this.state.players.map((player, i) => {
          return (
            player.position === category && (
              <Fade left delay={i * 20} key={i}>
                <div className="item">
                  <PlayerCard
                    number={player.number}
                    name={player.name}
                    lastName={player.lastName}
                    bck={player.url}
                  />
                </div>
              </Fade>
            )
          )
        })
      : null
  }
  render() {
    if (this.state.loading) return null
    return (
      <div
        className="the_team_container"
        style={{
          background: `url(${Stripes}) repeat`
        }}
      >
        {console.log(this.state)}
        <div className="team_category_wrapper">
          <div className="title">Keepers</div>
          <div className="team_cards">
            {console.log(this.showplayersByCategory('Keeper'))}
            {this.showplayersByCategory('Keeper')}
          </div>
        </div>
        <div className="team_category_wrapper">
          <div className="title">Defence</div>
          <div className="team_cards">
            {console.log(this.showplayersByCategory('Keeper'))}
            {this.showplayersByCategory('Defence')}
          </div>
        </div>
        <div className="team_category_wrapper">
          <div className="title">Midfield</div>
          <div className="team_cards">
            {console.log(this.showplayersByCategory('Keeper'))}
            {this.showplayersByCategory('Midfield')}
          </div>
        </div>
        <div className="team_category_wrapper">
          <div className="title">Strikers</div>
          <div className="team_cards">
            {console.log(this.showplayersByCategory('Striker'))}
            {this.showplayersByCategory('Striker')}
          </div>
        </div>
      </div>
    )
  }
}
