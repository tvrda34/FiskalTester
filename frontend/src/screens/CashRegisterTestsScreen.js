import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listTests, deleteTest } from "../actions/testActions";
import { addStarted } from '../actions/registerActions'
import { STARTED_CREATE_RESET } from "../constants/registerConstants";

function CashRegisterTestsScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const registerId = id;

  const testsList = useSelector((state) => state.testsList);
  const { loading, error, tests } = testsList;

  const testDelete = useSelector((state) => state.testDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = testDelete;

  const createStarted = useSelector(state => state.startedCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = createStarted

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: STARTED_CREATE_RESET })
    
    if (!userInfo) {
      navigate("/login");
    }
    console.log(successCreate)
    if (successCreate) {
      navigate("/tests/started")
    } else {
      dispatch(listTests(registerId));
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      dispatch(deleteTest(id));
    }
  };

  const startTestHandler = () => {
    dispatch(addStarted(id))
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Tests</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={startTestHandler}>
            <i className="fas fa-plus"></i> Start test
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th className="text-center">NAME</th>
                <th className="text-center">CREATED AT</th>
                <th className="text-center">RESULT</th>
                <th className="text-center">RESULT DESC.</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {tests.map((test) => (
                <tr key={test.id}>
                  <td className="align-middle text-center">
                    {test.register.name} {test.reciept}
                  </td>
                  <td className="align-middle text-center">{test.created}</td>
                  {test.result === true && <td className="align-middle text-center"><i className="fas fa-check text-center" style = {{ color: 'green'}}></i> </td>}
                  {test.result === false && <td className="align-middle text-center"><i className="fas fa-mark" style = {{ color: 'red'}}></i> </td>}
                  <td className="align-middle text-center">{test.result_description}</td>

                  <td>
                    <LinkContainer to={`/test/${test.id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-info-circle"> Details</i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(test.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default CashRegisterTestsScreen;
