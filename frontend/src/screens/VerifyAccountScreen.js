import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch  } from 'react-redux'
import { logout } from '../actions/userActions'

function VerifyAccountScreen() {

  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(logout())
    }, [dispatch])

  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <div className="align-middle text-center"><i className="fa fa-lg fa-envelope align-middle"> Almost there...</i></div>
                <br></br>
                <p className="align-middle text-center">Your account has been registered but you need to verify it first.<br/>
                Verification email has been sent to your email address. Follow the instructions there</p>
            </Col>
        </Row>
    </Container>
  )
}

export default VerifyAccountScreen