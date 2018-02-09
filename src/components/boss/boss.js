import React from 'react'
import axios from 'axios'

class Boss extends React.Component {
  async componentDidMount() {
    try {
      const { data } = await axios.get('/user/list?type=genius')
      console.log('boss-->', data)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div>Boss首页</div>
    )
  }
}

export default Boss
