import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { Navbar, Nav, Button, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'
import logo from '../logo.png'


class NavigationBar extends Component {

  handleLogout = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
    this.props.history.push('/')
  }

  render() {
    const {authedUser} = this.props
    return (
      <div className="navigation-bar mb-4">
        <Navbar bg="dark" variant="dark" width="80%">
              <Navbar.Brand 
              as={NavLink} exact to="/"
              >
              <img 
                      src={logo}
                      width="48"
                      height="48"
                      alt="logo of app"
              />
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link 
                  className="nav-link"
                  as={NavLink} to="/" exact
                >Home
                </Nav.Link>
                <Nav.Link 
                  className="nav-link"
                  as={NavLink}to="/add"
                >New Question
                </Nav.Link>
                <Nav.Link 
                  className="nav-link"
                  as={NavLink} to="/leaderboard"
                >Leaderboard
                </Nav.Link>
              </Nav>
                 {authedUser && (
                  <Nav className="ml-auto">
                  <Nav.Link>
                    < Image
                        width="48"
                        height="48"
                        src={authedUser.avatarURL}
                        alt={`Avatar of ${authedUser.name}`}                    
                    />
                    </Nav.Link>
                    <Nav.Link >
                      <p className="user-name text-center">Hello</p>
                      <p className="user-name">{authedUser.name}</p>
                    </Nav.Link>
                    <Nav.Link>
                    <Button onClick={this.handleLogout}> Logout</Button>
                    </Nav.Link>
                    </Nav>
                 )}

        </Navbar>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {

  
  return {
    authedUser: authedUser ? users[authedUser]: null
  }
}

export default withRouter(connect(mapStateToProps)(NavigationBar))