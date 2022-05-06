import React, { Component, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CollapsableRow from "../components/CollapsableRow";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteTest, testDetails } from "../actions/testActions";

function TestInspectScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const testResultId = id;

  const testInfo = useSelector((state) => state.testDetails);
  const { loading, error, tests } = testInfo;

  const testsList = useSelector((state) => state.testsList);
  const { loading: loadingRes, error: errorRes, tests: testsRes } = testsList;

  const testDelete = useSelector((state) => state.testDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = testDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (successDelete) {
      navigate(`/cash-registers`);
    } else {
      dispatch(testDetails(testResultId));
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      dispatch(deleteTest(id));
    }
  };

  return (
    <div>
      {loadingRes ? (
        <Loader />
      ) : errorRes ? (
        <Message variant='danger'>{errorRes}</Message>
      ) : (
        testsRes.map(
          (baset) =>
            baset.id == testResultId && (
              <div>
                <Row className='align-items-center'>
                  <Col>
                    <h1>Test Details: </h1>
                    <h2>
                      {baset.register.name} {baset.reciept}
                    </h2>
                  </Col>

                  <Col className='text-right'>
                    <Button className='my-3' onClick={deleteHandler}>
                      <i className='fas fa-trash'></i> Delete test
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                      <h6>Register info:</h6>
                      <hr></hr>
                      <p>name: {baset.register.name}<br/>
                      version: {baset.register.version}<br/>
                      location: {baset.register.location}</p>
                  </Col>
                  <Col className='text-right'>
                    <h6>Test status</h6>
                    {baset.result === true && (
                      <div class='alert alert-success' style = {{ borderRadius: 10, overflow: 'hidden'}}>
                        <h5 className='text-center' style={{ color: 'midnightblue' }}>Test passed</h5>
                      </div>
                    )}
                    {baset.result === false && (
                      <div class='alert alert-danger' style = {{ borderRadius: 10, overflow: 'hidden'}}>
                        <h5 className='text-center' style={{ color: 'darkred' }}>Test failed</h5>
                      </div>
                    )}
                    <p>{baset.result_description}</p>
                  </Col>
                </Row>
                <Row>
                  <p><b>Test started: </b>{baset.created}</p>
                </Row>
              </div>
            )
        )
      )}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Methods initiated in this test</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tests.map((row) => (
                  <CollapsableRow key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default TestInspectScreen;
