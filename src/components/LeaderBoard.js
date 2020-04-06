import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserResults from './UserResults'

class LeaderBoard extends Component {
  render() {
    return (
      <div>
        <h2 className='text-center'>Leaderboard</h2>
        <ul className="question-board">
          {this.props.userIDs.map((id) => (
            <li key={id}>
              <UserResults key={id} id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ users}) {
  const userIDs = Object.keys(users)
        .sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)))
   return {
    userIDs
  }
}

export default connect(mapStateToProps)(LeaderBoard)