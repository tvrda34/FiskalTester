import React from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Row, Col, Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import XMLViewer from "react-xml-viewer";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function CollapsableRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
         <b>METHOD: #{row.id}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Row className="py-3">
                <h6>Test done:</h6>
                <hr />
                <div><b>{row.testRun.name}:</b> {row.testRun.description}</div>
              </Row>
              <Row className="py-3">
                <h6>Test started:</h6>
                <hr />
                <div>{row.timestamp}</div>
              </Row>
              <Row className="py-3">
                <h6>Test note:</h6>
                <hr />
                <div>{row.description}</div>
              </Row>

              <Row className="py-3">
                <Col>
                  <h4>Request</h4>
                  <hr></hr>
                  <XMLViewer xml={row.request} />
                </Col>
                <Col className="py-2">
                  <h4>Response</h4>
                  <hr></hr>
                  <XMLViewer xml={row.response} />
                </Col>
              </Row>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CollapsableRow;
