import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import NotAvailable from './NotAvailable'
import NavigationBar from './NavigationBar'
import QuestionBoard from './QuestionBoard'
import Login from './Login'
import QuestionDetail from './QuestionDetail'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <NavigationBar/>
          <LoadingBar className="loading"/>
          <div className="App-Container">
            {this.props.loading === true // if user is null, render null, otherwise render QuestionBoard
                ? <Login/>
                : (
                  <Fragment>
                    <Switch>
                        <Route exact path='/' component={QuestionBoard} />
                        <Route path='/add' component={NewQuestion} />
                        <Route path='/questions/:id' component={QuestionDetail} />
                        <Route path='/leaderboard' component={LeaderBoard} />
                        <Route component={NotAvailable} />
                    </Switch>
                  </Fragment>
                )}
          </div>
      </Router>
    )
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    loading: authedUser === null || questions === null
  }
}

export default connect(mapStateToProps)(App)