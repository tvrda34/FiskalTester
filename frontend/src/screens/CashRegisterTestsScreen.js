import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listTests, deleteTest } from '../actions/testActions'

function CashRegisterTestsScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()
    const registerId = id

    const testsList = useSelector(state => state.testsList)
    const { loading, error, tests } = testsList

    const testDelete = useSelector(state => state.testDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = testDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }

        dispatch(listTests(registerId))
        
    }, [dispatch, navigate, userInfo, successDelete])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this test?')) {
            dispatch(deleteTest(id))
        }
    }

    const startTestHandler = () => {
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Tests</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={startTestHandler}>
                        <i className='fas fa-plus'></i> Start test
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

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
                                        <th className="text-center">RECIEPT</th>
                                        <th className="text-center">REGISTER</th>
                                        <th className="text-center">CREATED AT</th>
                                        <th className="text-center">RESULT</th>
                                        <th className="text-center">RESULT DESC.</th>
                                        <th/>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tests.map(test => (
                                            <tr key={test.id}>
                                            <td>{test.reciept}</td>
                                            <td>{test.register.name}</td>
                                            <td>{test.created}</td>
                                            <td>{test.result}</td>
                                            <td>{test.result_description}</td>
                                            
                                            <td>
                                                <LinkContainer to={`/test/${test.id}`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-info'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(test.id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
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

export default CashRegisterTestsScreen