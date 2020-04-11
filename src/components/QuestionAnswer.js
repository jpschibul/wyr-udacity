import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Button, Col,Container, Form, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { handleAnswer } from '../actions/questions';

class QuestionAnswer extends Component {

    handleVote = (answer) => {
    
        const { dispatch, question, authedUser } = this.props
        
        dispatch(handleAnswer({
          authedUser,
          answer,
          qid: question.id,
        }))
      }

    render () {
        const { question, author } = this.props
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
            </Card>
        )
    }
}

function mapStateToProps ({questions, users, authedUser}, {id}) {
    const question = questions[id] //display question

    return {
        authedUser,
        question,
		author: question ? users[question.author] : null 

    }
}

export default connect(mapStateToProps)(QuestionAnswer)