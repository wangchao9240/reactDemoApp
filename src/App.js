import React from 'react'
import { connect } from 'react-redux'
import { add, decrease, addAsync } from './index.redux'

// App = connect(mapStateProps, actionCreators)(App)
@connect(
  // 需要的属性
  state => ({ number: state }),
  // 需要的方法放到props，放到dispatch
  { add, decrease, addAsync }
)

class App extends React.Component{
  render() {
    return (
      <div>
        <h1>现在有机枪{ this.props.number }</h1>
        <button onClick={ this.props.add }>加枪</button>
        <button onClick={ this.props.addAsync }>拖两天再加枪</button>
      </div>
    )
  }
}

export default App