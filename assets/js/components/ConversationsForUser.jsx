import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Button, ControlLabel, FormControl, FormGroup,
  ListGroup, ListGroupItem, Modal, Panel } from 'react-bootstrap'


class ConversationsForUser extends React.Component {
  constructor () {
    super()
    this.state = { modalOpen: false }
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'USER_CHATS_FETCH',
      payload: this.props.params.userId,
    })
  }

  navigateTo = (item) => () => {
    let userId = this.props.params.userId
    let chatId = item.id
    this.props.router.push(`/${userId}/${chatId}`)
  }

  userAsString(user) {
    return `${user.username} (${user.first_name} ${user.last_name})`
  }

  otherParticipants(item) {
    let own_user_id = parseInt(this.props.params.userId)
    return item.participants
      .filter((i) => i.user.id !== own_user_id)
      .map((i) => this.userAsString(i.user))
  }

  renderItem(item) {
    return `Chat with ${this.otherParticipants(item)} (#${item.id})`
  }

  getRooms() {
    return this.props.rooms.filter((r) => {
      let participants = r.participants.map(p => p.user.id)
      return participants.indexOf(parseInt(this.props.params.userId)) !== -1
    })
  }

  createChatRoom = () => {
    this.props.dispatch({
      type: 'CREATE_CHAT_ROOM_INTENT',
      payload: {
        originator: parseInt(this.props.params.userId),
        participants: this.state.participants
      }
    })
    this.closeModal()
  }

  openModal = () => {
    console.log("WTF", this.props.users)
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  getSelectValues(select) {
    // From http://stackoverflow.com/a/27781069/488191
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(parseInt(opt.value || opt.text));
      }
    }
    return result;
  }

  changeConversationParticipants = (e) => {
    this.setState({
      participants: (this.getSelectValues(e.target))
    })
  }

  getOtherUsers = () =>
    this.props.users.filter((i) => i.user.id !== parseInt(this.props.params.userId))

  renderModal() {
    if (!this.state.modalOpen) return

    return (
      <Modal show={this.state.modalOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>New conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Please select the rest of participants</h1>
          <FormGroup controlId="newConversationParticipants">
            <ControlLabel>Participants</ControlLabel>
            <FormControl
              componentClass="select"
              multiple
              onChange={this.changeConversationParticipants}
            >
              {
                this.getOtherUsers().map((item, itemIndex) =>
                  <option value={item.user.id} key={itemIndex}>{this.userAsString(item.user)}</option>
              )
              }
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.createChatRoom}>Begin conversation!</Button>
        </Modal.Footer>
      </Modal>
    )
  }


  render () {
    return (
      <div>
        <Panel header="Active conversations">
          <ListGroup>
            {
              this.getRooms().map((item, itemIndex) =>
                <ListGroupItem
                  key={`${itemIndex}`}
                  id={`${itemIndex}`}
                  onClick={this.navigateTo(item)}
                >
                  {this.renderItem(item)}
                </ListGroupItem>
              )
            }
          </ListGroup>
        </Panel>
        {this.renderModal()}
        <Button onClick={this.openModal}>New conversation</Button>
      </div>
    )
  }
}

ConversationsForUser.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired,
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
    rooms: state.chats,
    logged_in: state.login.logged_in,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationsForUser))
