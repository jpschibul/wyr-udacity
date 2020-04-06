import React, { Component} from 'react'
import {connect } from 'react-redux'
import {Form, FormGroup, Button} from 'react-bootstrap'
import {handleAddQuestion} from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toDashboard: false
    }

    handleChange = (e) => {
        const {value, id} = e.target
        this.setState(() => ({[id]: value}))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {optionOne, optionTwo} = this.state
        const {dispatch} = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toDashboard: true
        }))
    }

    render() {
        const {optionOne, optionTwo, toDashboard} = this.state

        if (toDashboard === true) {
            return <Redirect to='/'/>
        }
        return (
            <div className="new-question">
                <h2>Enter your new question</h2>
                <Form 
                    className="text-center mt-2 mb-2"
                    onSubmit={this.handleSubmit}
                >
                    <FormGroup>
                        <input
                            type="text"
                            id="optionOne"
                            placeholder="Option One"
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="text"
                            id="optionTwo"
                            placeholder="Option Two "
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <div className="text-center mt-2 mb-2">
                        <Button
                            disabled={optionOne === '' || optionTwo === ''} 
                            className="button-main"
                            type="submit"
                            >Add Question
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default connect()(NewQuestion)