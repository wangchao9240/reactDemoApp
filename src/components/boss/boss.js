import React from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class Boss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  async componentDidMount() {
    try {
      const { data } = await axios.get('/user/list?type=genius')
      if (data.code === 0) {
        this.setState({
          data: data.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const cardCom = (v) => (
      <Card key={ v._id }>
        <Card.Header
          title={ v.user }
          thumb={ require(`../img/${v.avatar}.png`) }
          extra={<span>{ v.title }</span>}
        />
        <Card.Body>
          { v.desc.split('\n').map(item => (
            <div>{ item }</div>
          )) }
        </Card.Body>
      </Card>
    )
    return (
      <div>
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          { this.state.data.map(v => v.avatar ? cardCom(v) : null) }
        </WingBlank>
      </div>
    )
  }
}

export default Boss
