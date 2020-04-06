import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Card, Button, Col,Container, Form, Row, ProgressBar} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { handleAnswer } from '../actions/questions'
import NotAvailable from './NotAvailable'

class QuestionDetail extends Component {

  handleVote = (answer) => {
    
    const { dispatch, question, authedUser } = this.props
    
    dispatch(handleAnswer({
      authedUser,
      answer,
      qid: question.id,
    }))
  }
  render() {
    const { authedUser, question, totalOptionOne, totalOptionTwo, totalVoters, optionOnePerc, optionTwoPerc } = this.props
  
    return (
      <Card>
        <div className='question-box'>
            <div>
              {question !== null && (                
                <div>
                    <div className="card-header">          
                      {question.author} asks
                      <Link to={`/`}>
                        <Button
                          variant="secondary"
                          className="btn-group float-right mb-4"
                          >Questionboard                      
                        </Button>
                      </Link>               
                    </div>      
                    {question.isAnswered ? (//Question has been answered, rendering results
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
                    )
                    : (//Question has not been answered
                      <Container>
                        <Row className='question-text p-4'>
                        <Col className="text-center">
                          <h3>Would you rather?</h3>
                          <Form>
                            <Form.Group controlId="form-answer">
                                <Form.Check 
                                  type="checkbox" 
                                  onClick={(e) => { this.handleVote('optionOne'); }} 
                                  label={question.optionOne.text} 
                                />
                                <Form.Check 
                                  type="checkbox" 
                                  onClick={(e) => { this.handleVote('optionTwo'); }} 
                                  label={question.optionTwo.text} 
                                />
                            </Form.Group>
                          </Form>
                          </Col>
                        </Row>
                      </Container>
                    )}
                  </div>
              )}
              {question === null && (//Question id is invalid or could not be found
                <div>
                  <NotAvailable />
                </div>
              )}
            </div>
          </div>
      </Card>
    )
  }
}

function mapStateToProps({ users, questions, authedUser }, props) {
  const { id } = props.match.params //taking id from url
  const question = questions[id] //display question
  const author = users[question.author].name
  const isAnswered = (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))

  
  const totalOptionOne = question.optionOne.votes.length
  const optionOnePerc = Number(question.optionOne.votes.length/(question.optionOne.votes.length + question.optionTwo.votes.length)*100).toFixed(2).toString()
  const optionTwoPerc = Number(question.optionTwo.votes.length/(question.optionOne.votes.length + question.optionTwo.votes.length)*100).toFixed(2).toString()
  const totalOptionTwo = question.optionTwo.votes.length
  const totalVoters = totalOptionOne + totalOptionTwo
  return {
    authedUser,
    totalOptionOne,
    totalOptionTwo,
    optionOnePerc,
    optionTwoPerc,
    totalVoters,
    question: question ? {...question, author,  isAnswered} : null, //create copy of question with updated values
    users
  }
}

export default connect(mapStateToProps)(QuestionDetail)