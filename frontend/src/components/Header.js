import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
      dispatch(logout())
  }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                  <Navbar.Brand >Fiskal tester</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">

                    {userInfo ?(
                      <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to='/cash-registers'>
                            <NavDropdown.Item>Cash registers</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to='/tests/started'>
                            <NavDropdown.Item>Registers in test</NavDropdown.Item>
                          </LinkContainer>

                          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                      </NavDropdown>
                    ) : (
                      <LinkContainer to="/login">
                          <Nav.Link ><i className="fas fa-user" /> LOGIN</Nav.Link>
                    </LinkContainer>
                    )}

                    <LinkContainer to="/faq">
                          <Nav.Link href="/faq"><i className="fas fa-question-circle"/> FAQ</Nav.Link>
                    </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header