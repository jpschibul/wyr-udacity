import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col} from 'react-bootstrap'

class UserResults extends Component {

    render() {

        const { user } = this.props
        const { avatarURL,answers, name } = user

        const userAnswered = Object.keys(answers).length
        const userCreated = user.questions.length
        const userTotal = userAnswered + userCreated

        return (
            <Card>
                <div className='question-box'>
                        <Container>
                            <Row className='p-4'>
                                <Col className='author-image text-center'>
                             <img 
                                src={avatarURL}
                                alt={`Avatar of ${name}`}                    
                            />
                            {name}
                                </Col>
                                <Col className='text-center'>
                                    <p>Answers: {userAnswered}</p>
                                    <p>Created Questions: {userCreated}</p>
                                </Col>
                                <Col className="total-score text-center">
                                    <h3>Total Score</h3>
                                    <p>{userTotal}</p>
                                </Col>
                            </Row>
                        </Container>
                </div>
            </Card>
        )
    }
}

function mapStateToProps({users}, {id}) {
    const user = users[id]
    return {
        user
    }
}

export default connect(mapStateToProps)(UserResults)