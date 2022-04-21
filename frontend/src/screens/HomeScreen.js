import React, {useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import axios from 'axios'
import HomeCarousel from '../components/HomeCarousel'
import About from '../components/About'


function HomeScreen() {
  const [registers, setRegisters] = useState([])

  useEffect(() => {
    
    async function fetchRegisters(){
      const { data } = await axios.get('/api/registers')
      setRegisters(data)
    }

    fetchRegisters()
  }, [])

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