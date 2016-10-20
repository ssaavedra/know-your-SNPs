import React from 'react'
import { connect } from 'react-redux'

import { ControlLabel, FormControl, FormGroup, Media, Panel } from 'react-bootstrap'


class ChatPage extends React.Component {
  constructor () {
    super()
    this.state = { value: '' }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'CHAT_FETCH',
      payload: {
        user_id: this.props.params.userId,
        chat_id: this.props.params.chatId,
      }
    })
  }

  userAsString(user) {
    return `${user.username} (${user.first_name} ${user.last_name})`
  }

  otherParticipants() {
    let own_user_id = parseInt(this.props.params.userId)
    return this.chat().participants
      .filter((i) => i.user.id !== own_user_id)
      .map((i) => this.userAsString(i.user))
  }

  chat = () => {
    let e = this.props.chats.filter((c) => c.id === parseInt(this.props.params.chatId))[0]
    return e
  }

  renderHeader() {
    return `Chat with ${this.otherParticipants()} (#${this.chat().id})`
  }

  getMessages() {
    return this.props.messages.filter((m) => {
      return m.chat === parseInt(this.props.params.chatId)
    })
  }

  getUserForMessage(msg) {
    let users = this.props.users
    let msgUser = users.filter((u) => u.user.id === msg.sender)
    return this.userAsString(msgUser[0].user)
  }

  getPictureForMessage(msg) {
    let users = this.props.users
    let msgUser = users.filter((u) => u.user.id === msg.sender)
    return msgUser[0].profile_picture
  }

  renderMessages() {
    if (!this.chat()) {
      return "No messages yet..."
    }

    let users = this.props.users

    return (<Media.List>{
      this.getMessages().map((item, itemIndex) =>
        <Media.ListItem key={itemIndex}>
        <Media.Left>
          <img width={64} height={64} src={this.getPictureForMessage(item)} alt="Profile picture" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            {this.getUserForMessage(item)}
          </Media.Heading>
          <p>{item.text}</p>
        </Media.Body>
      </Media.ListItem>
      )
    }
    </Media.List>)
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    let userId = this.props.params.userId
    let chatId = this.props.params.chatId
    this.props.dispatch({
      type: 'MESSAGE_SUBMIT',
      payload: {
        text: this.state.value,
        sender: userId,
        chat_id: chatId,
      },
    })
    this.setState({value: ''})
    e.preventDefault()
  }

  render () {
    return (
      <Panel header={this.renderHeader()}>
        {this.renderMessages()}
        <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="chatMsg">
            <ControlLabel>Send message</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text..."
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </Panel>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
    chats: state.chats,
    messages: state.messages,
    logged_in: state.login.logged_in,
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
)(ChatPage)
