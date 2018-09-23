import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from './components/authRoutes/privateRoutes'
import PublicRoute from './components/authRoutes/publicRoutes'
import Layout from './hoc/Layout'
import Home from './components/home'
import SignIn from './components/signIn'
import Dashboard from './components/admin/Dashboard'
import AdminMatches from './components/admin/matches'
import AddEditMatch from './components/admin/matches/addEditMatch'
import AdminPlayers from './components/admin/players'
import AddEditPlayers from './components/admin/players/addEditPlayers'
import TheTeam from './components/theTeam'
import TheMatches from './components/theMatches'
import NotFound from './components/ui/NotFound'

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          path="/admin_players/add_player/:id"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoute
          {...props}
          path="/admin_players/add_player"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoute
          {...props}
          path="/admin_players"
          exact
          component={AdminPlayers}
        />
        <PrivateRoute
          {...props}
          path="/admin_matches/edit_match"
          exact
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />
        <PrivateRoute
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <PublicRoute
          {...props}
          restricted={true}
          path="/sign_in"
          exact
          component={SignIn}
        />
        <PublicRoute
          {...props}
          restricted={false}
          exact
          component={TheTeam}
          path="/the_team"
        />
        <PublicRoute
          {...props}
          restricted={false}
          exact
          component={TheMatches}
          path="/the_matches"
        />
        <PublicRoute
          {...props}
          restricted={false}
          exact
          component={Home}
          path="/"
        />
        <PublicRoute
          {...props}
          restricted={false}
          component={NotFound}
          path="/"
        />
      </Switch>
    </Layout>
  )
}

export default Routes
