import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'

function RegisterScreen({ history }) {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, success } = userRegister

    useEffect(() => {
        if (success) {
            navigate('verification')
        }
    }, [navigate, success, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

  return (
    <FormContainer>
        <h1>Register</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='py-2'>
                <Form.Label>Name & Surname</Form.Label>
                <Form.Control required type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='email' className='py-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='password' className='py-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='passwordConfirm' className='py-2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>

            
            <Button type='submit' variant='primary' >Register</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an Account? <Link to={'/login'}>Sign in</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen