import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listRegisters, deleteRegister, createRegister } from '../actions/registerActions'
import { REGISTER_CREATE_RESET } from '../constants/registerConstants'

function CashRegistersScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const registersList = useSelector(state => state.registersList)
    const { loading, error, registers } = registersList

    const registerDelete = useSelector(state => state.registerDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = registerDelete

    const registerCreate = useSelector(state => state.registerCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, register: createdRegister } = registerCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: REGISTER_CREATE_RESET })

        if (!userInfo) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/cash-registers/${createdRegister.id}/edit`)
        } else {
            dispatch(listRegisters())
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdRegister])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this cash register?')) {
            dispatch(deleteRegister(id))
        }
    }

    const createRegisterHandler = () => {
        dispatch(createRegister())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Cash Registers</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createRegisterHandler}>
                        <i className='fas fa-plus'></i> Create Cash Register
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th className="text-center">NAME</th>
                                        <th className="text-center">VERSION</th>
                                        <th className="text-center">LOCATION</th>
                                        <th className="text-center">DESCRIPTION</th>
                                        <th className="text-center">CREATED AT</th>
                                        <th className="text-center">TEST NUM.</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {registers.map(register => (
                                        <tr key={register.id}>
                                            <td className="align-middle text-center">{register.name}</td>
                                            <td className="align-middle text-center">{register.version}</td>
                                            <td className="align-middle text-center">{register.location}</td>
                                            <td className="align-middle text-center">{register.description}</td>
                                            <td className="align-middle text-center">{register.createdAt}</td>
                                            <td className="align-middle text-center">{register.numTest}</td>

                                            <td className="align-middle text-center">
                                                <LinkContainer to={`/cash-registers/${register.id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(register.id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>

                                            </td>

                                            <td className="align-middle text-center">
                                                <LinkContainer to={`/cash-registers/tests/${register.id}`}>
                                                    <Button variant='light' className='btn-sm btn btn-outline-primary'>
                                                        <i className='fas fa-tachometer'>Tests</i>
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
        </div>
    )
}

export default CashRegistersScreen