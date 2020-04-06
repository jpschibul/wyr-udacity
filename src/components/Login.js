import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoLarge from '../logo-large.png'



class Login extends Component {
  state = {
    currentUser: '',
    isLogged: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {currentUser} = this.state
    const {dispatch} = this.props

    if (currentUser !== "") {
        dispatch(setAuthedUser(currentUser))
        this.setState(() => ({isLogged: true}))
    }

    
}
handleChange = (e) => {
    const currentUser = e.target.value
    this.setState(() => ({currentUser}))
}

  // shows list of users to login from
  render () {

  
    return (
      <div className="login-container">
      {console.log(this.state)}

        <div>
          <h2>Would You Rather App</h2>
          <div className="text-center mt-5 mb-5">
            <img 
                      src={logoLarge}
                      alt="logo of app"
            />
          </div>
          <select className="browser-default custom-select text-align:center"
            value={this.state.selectedOption}
            onChange={this.handleChange}
          >
            <option>Choose your User</option>
            {
              this.props.users.map((user) => (
                <option 
                  key={user.id} 
                  id={user.id} 
                  value={user.id}>
                  {user.name}
                </option>
                ))
            }
          </select>
          <Link to="/">
            <div className="text-center mt-2 mb-2">
                <Button
                  className="button-main"
                  variant="primary"
                  onClick={this.handleSubmit}
                >
                Sign In
                </Button>
            </div>
          </Link>
      </div>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {

  return {
    users: Object.values(users).map((user) => {
      return ({
          id: user.id,
          name: user.name
      })
  }),
    currentUser: authedUser
  }
}

export default connect(mapStateToProps)(Login)