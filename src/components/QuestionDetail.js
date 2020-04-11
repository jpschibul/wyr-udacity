import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotAvailable from './NotAvailable'
import QuestionAnswer from './QuestionAnswer'
import QuestionResults from './QuestionResults'

class QuestionPage extends Component {
  
  render() {
    const { question } = this.props
  
    return (
      <div className="question-page">
        <div className="container">
          <header className="app-header">
            <h1 className="app-title">Question</h1>
          </header>
          <div>
            {question !== null && (
              <div className="card">
      
                  {question.isAnswered ? (
                  <QuestionResults id={question.id} />
                  )
                  : (
                    <QuestionAnswer id={question.id} />
                  )}
                </div>
            )}
            {question === null && (
              <NotAvailable/>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  

      return {
        question: question ? {...question, 
        isAnswered: (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))} : null,
    }
  }
export default connect(mapStateToProps)(QuestionPage);