import React from 'react'
import { Link, IndexLink } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
import LoginComponent from './Login'

export default class MainToolBar extends React.Component {
  render () {
    return (
      <Navbar defaultExpanded={true}>
        <Navbar.Header className="navbar-header">
          <Navbar.Brand>
            <Link to="/">DjMessenger&trade;</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem>User List</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/about">
              <NavItem>About</NavItem>
            </LinkContainer>
          </Nav>
          <LoginComponent />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
