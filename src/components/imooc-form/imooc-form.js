import React from 'react'

const imoocForm = (Comp) => {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    handlerChange(key, val) {
      this.setState({
        [key]: val
      })
    }
    render() {
      return <Comp handlerChange={ (key, val) => this.handlerChange(key, val) } state={ this.state } { ...this.props }></Comp>
    }
  }
}

export default imoocForm