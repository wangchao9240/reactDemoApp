import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter

class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  handlerClick(v) {
    console.log('props', this.props)
    this.props.history.push(`/chat/${v.user}`)
  }
  render() {
    const cardCom = (v) => (
      <Card
        key={ v._id }
        onClick={ () => this.handlerClick(v) }
      >
        <Card.Header
          title={ v.user }
          thumb={ require(`../img/${v.avatar}.png`) }
          extra={<span>{ v.title }</span>}
        />
        <Card.Body>
          { v.type === 'boss' ? <div>公司：{ v.company }</div> : null }
          { v.desc.split('\n').map(item => (
            <div key={ item }>{ item }</div>
          )) }
          { v.type === 'boss' ? <div>薪资：{ v.money }</div> : null }
        </Card.Body>
      </Card>
    )
    return (
      <div>
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          { this.props.userlist.map(v => v.avatar ? cardCom(v) : null) }
        </WingBlank>
      </div>
    )
  }
}

export default UserCard