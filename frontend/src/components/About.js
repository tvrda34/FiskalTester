import React from 'react'
import { Image, Row, Col, Container } from 'react-bootstrap'

export default function About() {
  return (
      <Container>
            <Row>
                Application is created as a Final BSc Thesis on Faculty of Electrical Engineering and Computing
            </Row>
            <Row className="py-3">
                <Col md={5}>
                    <a href="https://github.com/tvrda34" target={'_blank'} rel="noopener noreferrer external" >
                        <Image src="/images/GitHub-Mark.png" className="justify-content-md-center" alt="GitHub Repository" fluid></Image>
                    </a>
                    <span className="text-center py-3"> Click on image for GitHub repository</span>
                </Col>
            </Row>
      </Container>
  )
}
