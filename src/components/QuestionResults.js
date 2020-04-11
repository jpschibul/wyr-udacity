import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {Card, Button, ProgressBar} from 'react-bootstrap'

class QuestionResults extends Component {
    render () {
        const { authedUser, author, question, totalOptionOne, totalOptionTwo, totalVoters, optionOnePerc, optionTwoPerc } = this.props
   
        return (
            <Card>
                <div className="card-header">
                    {author.name} asks
                    <Link to={`/`}>
                        <Button
                          variant="secondary"
                          className="btn-group float-right mb-4"
                          >Questionboard                      
                        </Button>
                    </Link>
                </div>
                <div className="result-box">
                        <div className="progress-option1">
                          <ProgressBar className="progressbar-styling" variant="success" now={optionOnePerc} label={`${optionOnePerc}%`}/>
                          <p>{totalOptionOne === 0 ? '0': totalOptionOne} of {totalVoters} voted for {question.optionOne.text}</p>
                        </div>
                        <div className="progress-option2">
                          <ProgressBar className="progressbar-styling" variant="info" now={optionTwoPerc} label={`${optionTwoPerc}%`}/>
                          <p>{totalOptionTwo === 0 ? '0': totalOptionTwo} of {totalVoters} voted for {question.optionTwo.text}</p>
                        </div>
                    <div>
                    <div>
                        <div className="your-answer">Your answer: 
                            { question.optionOne.votes.includes(authedUser) 
                            ? (<strong>{question.optionOne.text}</strong>) 
                            : (<strong>{question.optionTwo.text}</strong>)}
                            </div> 
                        </div>
                      </div>
                    </div>  
            </Card>
        )
    }
}

function mapStateToProps ({questions, users, authedUser}, {id}) {
    const question = questions[id] //display question
    const totalOptionOne = question.optionOne.votes.length
    const optionOnePerc = Number(question.optionOne.votes.length/(question.optionOne.votes.length + question.optionTwo.votes.length)*100).toFixed(2).toString()
    const optionTwoPerc = Number(question.optionTwo.votes.length/(question.optionOne.votes.length + question.optionTwo.votes.length)*100).toFixed(2).toString()
    const totalOptionTwo = question.optionTwo.votes.length
    const totalVoters = totalOptionOne + totalOptionTwo

    return {
        authedUser,
        question,
        totalOptionOne,
        totalOptionTwo,
        optionOnePerc,
        optionTwoPerc,
        totalVoters,
        author: question ? users[question.author] : null,
    }


}

export default connect (mapStateToProps) (QuestionResults)
