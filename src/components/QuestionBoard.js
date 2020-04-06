import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Question from './Question'

class QuestionBoard extends Component {

  render() {

    const {answered, unAnswered} = this.props

    return (
      <div>
        <h2>Would You Rather App</h2>
        <div className="question-board">
          <Tabs>
                  <TabList>
                          <Tab>Unanswered</Tab>
                          <Tab>Answered</Tab>
                  </TabList>
                  <TabPanel>
                  <ul className="questionboard-list">
                      {unAnswered.map((question) =>(
                          <li key={question.id}>
                              <Question id={question.id} />
                          </li>
                      ))}
                  </ul>
                  </TabPanel>
                  <TabPanel>
                  <ul className="questionboard-list">
                      {answered.map((question) =>(
                          <li key={question.id}>
                              <Question id={question.id}/>
                          </li>
                      ))}
                  </ul>
                  </TabPanel>
                  </Tabs> 
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {

    const hasAnswered = users[authedUser].answers //which questions have been answered by authedUser
    
    const answered =  Object.values(questions) //apply on question, sorted by user
            .filter((question) => {
       return Object.keys(hasAnswered).includes(question.id)
     }).sort((a, b) => b.timestamp - a.timestamp)
     
     const unAnswered = Object.values(questions).filter((question) => {
       return !(Object.keys(hasAnswered).includes(question.id))
     }).sort((a, b) => b.timestamp - a.timestamp)

     return {
       answered,
       unAnswered  
  }
}

export default connect(mapStateToProps)(QuestionBoard)