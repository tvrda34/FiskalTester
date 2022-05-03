import React from 'react'
import { Row } from 'react-bootstrap'
import HomeCarousel from '../components/HomeCarousel'
import About from '../components/About'


function HomeScreen() {
  
  return (
    <div>
        <Row>
            <h1 className="text-center py-3">Welcome to Fiskal tester</h1>
            <HomeCarousel />
        </Row>
        <Row className="py-3">
          <About />
        </Row>
    </div>
  )
}

export default HomeScreen