import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {Card, Container, Row, Col, Button} from 'react-bootstrap'



class Question extends Component {
    render() {

        const { question, author, id } = this.props

        const { name, avatarURL } = author;

        if (question === null) {
            return <p>This Question does not exist</p>
        }

        console.log(this.props)
        return (
            <Card>
                <div className='question-box'>
                    <div className="card-header">
                        {name} asks
                     </div>
                        <Container>
                            <Row className='p-4'>
                                <Col className='author-image text-center'>
                                    <img 
                                        src={avatarURL}
                                        alt={`Avatar of ${name}`}                    
                                    />
                                </Col>
                                <Col className="text-center">
                                    <h3>Would you rather?</h3>
                                        <p className='question-text'>... {question.optionOne.text} ... </p>
                                        <Link to={`/questions/${id}`}>
                                            <Button 
                                            variant="secondary"
                                            >
                                            See Question
                                            </Button>
                                        </Link>
                                </Col>
                            </Row>
                        </Container>
                </div>
            </Card>
        )
    }
}

function mapStateToProps({ users, questions}, {id} ) {
    const question = questions[id]

    return {
        question: question ? question : null,
        author: question ? users[question.author] : null
    }
}


export default connect(mapStateToProps)(Question)