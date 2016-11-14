import React from 'react'

const initialState = {
  smallItemsById: {
    '1' : {
      color: 'green',
      value: 'hey'
    },
    '2' : {
      color: 'red',
      value: 'now'
    }
  }
}

const randomColor = () => {
  const colors = ['red', 'green', 'blue', 'white', 'yellow']
  return colors[Math.floor(Math.random()*colors.length)]
}

const RootComponent = React.createClass({
  getInitialState() {
    return initialState
  },

  randomAnimation() {
    const randomId = Math.ceil(Math.random()*2)
    const newState = {
      ...this.state,
      smallItemsById: {
        ...this.state.smallItemsById,
        [randomId]: {
          ...this.state.smallItemsById[randomId],
          color: randomColor()
        }
      }
    }
    this.setState(newState)
  },

  startRandomAnimations() {
    setInterval(this.randomAnimation, 16)
  }

  componentDidMount() {
    startRandomAnimations()
  },

  render() {
    return <GroupingComponent {...state}/>
  }
})
