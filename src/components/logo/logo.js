import React from 'react'
import logoImg from './job title.png'

class Logo extends React.Component {
  render() {
    return (
      <div className="LogoContainer">
        <img src={ logoImg } alt=""/>
      </div>
    )
  }
}

export default Logo