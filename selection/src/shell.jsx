import React from 'react'
import styles from './shell.styl'
import uuid from 'uuid'
import { Map } from 'immutable'
import ContentEditableLine from './contentEditableLine'

class Shell extends React.Component {
  constructor(props) {
    super(props)
    const id1 = uuid.v4()
    const id2 = uuid.v4()
    const id3 = uuid.v4()
    this.state = {
      nodes: Map({
        [id1]: {id: id1, name: 'malcom', isContentEditable: true},
        [id2]: {id: id2, name: 'jacob', isContentEditable: true},
        [id3]: {id: id3, name: 'ali', isContentEditable: true}
      }),
      selection: {
        nodeId: id1,
        start: 2,
        end: 2
      },
      containerIsContentEditable: false
    }
  }

  componentDidMount() {

  }

  changeName(id, selection) {
    const newState = {
      nodes: this.state.nodes.set(id, {id, name: '12345678', isContentEditable: true}),
      selection: selection || this.state.selection,
      containerIsContentEditable: this.state.containerIsContentEditable
    }
    this.setState(newState)
  }

  getContainer() {
    return this.refs['container']
  }

  makeParentContentEditable() {
    const newState = {
      nodes: this.state.nodes.map(node => Object.assign({}, node, {isContentEditable: false})),
      selection: this.state.selection,
      containerIsContentEditable: true
    }
    this.setState(newState)
  }

  makeNodesContentEditable() {

    const newState = {
      nodes: this.state.nodes.map(node => Object.assign({}, node, {isContentEditable: true})),
      selection: this.state.selection,
      containerIsContentEditable: false
    }
    this.setState(newState)
  }

  handleMouseDown() {
    this.makeParentContentEditable()
  }

  handleMouseUp() {
    this.makeNodesContentEditable()
  }

  render() {
    return <div className={styles.main}>
      <div className={styles.sidebar}>
      </div>
      <div 
        className={styles.content} 
        contentEditable={this.state.containerIsContentEditable}
        ref='container'

        onMouseDown={::this.handleMouseDown}
        onMouseUp={::this.handleMouseUp}
      >
        <div className={styles.lineWrapper}>
          {this.state.nodes.map(node => (
            <ContentEditableLine 
              node={node}
              selection={this.state.selection}
              changeName={::this.changeName}
            />
          ))}
        </div>
      </div>
    </div>
  }
}

export default Shell
