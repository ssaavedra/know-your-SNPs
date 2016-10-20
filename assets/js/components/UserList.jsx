import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { ListGroup, ListGroupItem } from 'react-bootstrap'


class UserList extends React.Component {
  renderFetching () {
    return <h1>Fetching user list...</h1>
  }

  navigateTo = (item) => () => {
    let userId = item.user.id
    this.props.router.push(`/${userId}`)
  }

  renderUserProfile(profile) {
    return `${profile.user.username} (${profile.user.first_name} ${profile.user.last_name})`
  }

  render () {
    return (
      <ListGroup>
        {
          this.props.users.map((item, itemIndex) =>
            <ListGroupItem
              key={`${itemIndex}`}
              id={`${itemIndex}`}
              onClick={this.navigateTo(item)}
            >
              {this.renderUserProfile(item)}
            </ListGroupItem>
          )
        }
      </ListGroup>
    )
  }
}

UserList.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired,
  users: React.PropTypes.array.isRequired
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
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
)(UserList))
