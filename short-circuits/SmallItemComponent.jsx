import React from 'react'

const SmallItemComponent = React.createClass({
  render() {
    return <div>
      Hey I'm a small item with value
      <span ref='valueBox' style={{ color: this.props.color }}>
        {this.props.value}
      </span>
    </div>
  },

  updateValue(newValue) {
    const node = ReactDOM.findDOMNode(this.refs['valueBox'])
    node.innerHTML = newValue
  },

  updateColor(newColor) {
    const node = ReactDOM.findDOMNode(this.refs['valueBox'])
    node.style.color = newColor
  }
})

export default SmallItemComponent
