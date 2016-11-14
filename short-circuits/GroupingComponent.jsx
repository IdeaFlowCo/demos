import React from 'react'

import SmallItemComponent from './SmallItemComponent'

const GroupingComponent = React.createClass({
  getInitialState() {
    this.subSmallComponentsById = {}
    return null
  }

  shouldComponentUpdate(nextProps) {
    return !this.attemptManualSmallItemUpdate(nextProps.smallItemsById)
  },

  render() {
    return <div>
      {Object.keys(smallItemsById).map(smallItemId => {
        const smallItemProps = smallItemsById[smallItemId]
        <SmallItemComponent
          ref={(comp) => this.subSmallComponentsById[smallItemProps.id] = comp}
          {...smallItemProps}
        />
      })}
    </div>
  },

  attemptManualSmallItemUpdate(smallItemsById) {
    let correctlyUpdated = true
    Object.keys(smallItemsById).forEach(smallItemId => {
      if(this.subSmallComponentsById[smallItemId]) {
        const smallItemProps = smallItemsById[smallItemId]
        this.subSmallComponentsById[smallItemId].updateValue(smallItemProps.value)
        this.subSmallComponentsById[smallItemId].updateColor(smallItemProps.color)
      } else {
        correctlyUpdated = false
      }
    })
    return correctlyUpdated
  },
})

export default GroupingComponent
