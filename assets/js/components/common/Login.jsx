import React, { Component } from 'react'
import { Button, Modal, Navbar, Nav, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import FormField from './FormField'

class LoginComponent extends Component {
  constructor () {
    super()
    this.state = { modalOpen: false }
  }

  openModal = () => {
    this.props.dispatch({type: 'USER_LOGIN_REQUEST_STATUS'})
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  componentWillMount() {
    this.props.dispatch({type: 'USER_LOGIN_REQUEST_STATUS'})
  }

  startGoogleDialog = () => {
    this.props.dispatch({type: 'USER_LOGIN_INTENT'})
  }

  renderModal() {
    if (!this.state.modalOpen) return

    return (
      <Modal show={this.state.modalOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Login with Google</h1>
          <p>You will now be redirected to Google to use your account to log in.</p>
          <Button bsStyle="primary" onClick={this.startGoogleDialog}>Log in with Google</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  handleLogout = () => {
    this.props.dispatch({type: 'USER_LOGOUT_INTENT'})
  }

  renderLoginButton (action, loginText) {
    return (
      <span>
        <Navbar.Form pullRight>
          {this.renderModal()}
          <Button onClick={this.openModal}>{action}</Button>
        </Navbar.Form>
        <Navbar.Text pullRight>{loginText}</Navbar.Text>
      </span>
    )
  }

  renderLogoutButton (action, loginText) {
    return (
      <span>
        <Navbar.Form pullRight>
          <Button onClick={this.handleLogout}>{action}</Button>
        </Navbar.Form>
        <Navbar.Text pullRight>{loginText}</Navbar.Text>
      </span>
    )
  }

  render () {
    let loginText = `Hello, ${this.props.username}`

    if(this.props.logged_in) {
      let action = 'Log out'
      return this.renderLogoutButton(action, loginText)
    } else {
      let action = 'Log in'
      return this.renderLoginButton(action, loginText)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    logged_in: state.login.logged_in
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)
