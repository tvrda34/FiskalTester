import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listStarted, deleteStarted } from "../actions/registerActions";

function TestsStartedScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startedTestsList = useSelector((state) => state.startedList);
  const { loading, error, testsStarted } = startedTestsList;

  const startedDelete = useSelector((state) => state.startedDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = startedDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    dispatch(listStarted());
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to remove this started uuid?")) {
      dispatch(deleteStarted(id));
    }
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Tests started</h1>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th className="text-center">REGISTER NAME</th>
                <th className="text-center">UUID</th>
                <th className="text-center">CREATED AT</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {testsStarted.map((startedTest) => (
                <tr key={startedTest.uuid}>
                  <td className="align-middle text-center">
                    {startedTest.register.name}
                  </td>
                  <td className="align-middle text-center">
                    {startedTest.uuid}
                  </td>
                  <td className="align-middle text-center">
                    {startedTest.timestamp}
                  </td>

                  <td className="align-middle text-center">
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(startedTest.uuid)}
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

export default TestsStartedScreen;
