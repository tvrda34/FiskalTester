import React, { useState } from 'react'
import data from '../data'
import { Link } from 'react-router-dom'
import SingleQuestion from '../components/Question'


export default function FAQScreen() {
  
    const [questions] = useState(data)
    
    return (
      <main>
      <Link to='/' className='btn btn-light'>Go Back</Link>
      <div className='containerq'>
        <h3>questions and answers about fiskal tester</h3>
        <section className='info'>
          {questions.map((question) => (
            <SingleQuestion key={question.id} {...question} />
          ))}
        </section>
      </div>
    </main>
    )
  }