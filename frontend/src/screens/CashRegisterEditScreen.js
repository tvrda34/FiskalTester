import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listRegisterDetails, updateRegister } from '../actions/registerActions'
import { REGISTER_UPDATE_RESET } from '../constants/registerConstants'


function CashRegisterEditScreen({ props }) {

    const { id } = useParams()
    const registerId = id
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [version, setVersion] = useState(0)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [testnum, setTestNum] = useState(0)
    const [createdat, setCreatedAt] = useState('')

    const dispatch = useDispatch()

    const registerDetails = useSelector(state => state.registerDetails)
    const { error, loading, register } = registerDetails

    const registerUpdate = useSelector(state => state.registerUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = registerUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: REGISTER_UPDATE_RESET })
            navigate('/cash-registers')
        } else {
            if (!register.name || register.id !== Number(registerId)) {
                dispatch(listRegisterDetails(registerId))
            } else {
                setName(register.name)
                setVersion(register.version)
                setLocation(register.location)
                setDescription(register.description)
                setCreatedAt(register.createdAt)
                setTestNum(register.numtest)
            }
        }



    }, [dispatch, register, registerId, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateRegister({
            id: registerId,
            name,
            location,
            version,
            description
        }))
    }

    return (
        <div>
            <Link to='/cash-registers' className='btn btn-light' my-3>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Cash Register</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='version'>
                                <Form.Label>Version</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter version'
                                    value={version}
                                    onChange={(e) => setVersion(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='location'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='testnum'>
                                <Form.Label>Test Num.</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Disabled input'
                                    value={testnum}
                                    disabled
                                    readOnly
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='createdat'>
                                <Form.Label>Created at</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Disabled input'
                                    value={createdat}
                                    disabled
                                    readOnly
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' variant='primary' className='py-3'>
                                Update
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default CashRegisterEditScreen