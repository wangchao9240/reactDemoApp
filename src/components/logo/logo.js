import React from 'react'
import './logo.css'

class Logo extends React.Component {
  render() {
    console.log(require('./job.png'))
    return (
      <div className="LogoContainer">
        <img src={ require(`./job.png`) } alt=""/>
      </div>
    )
  }
}

export default Logo
