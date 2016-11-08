import React from 'react'
import styles from './shell.styl'
import uuid from 'uuid'
import { setCharRange, restoreCustomBookMark, getSelection, getCurrentBookMark } from './selectionModel'
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
        [id1]: {id: id1, name: 'malcom', isContentEditable: null},
        [id2]: {id: id2, name: 'jacob', isContentEditable: null},
        [id3]: {id: id3, name: 'ali', isContentEditable: null}
      }),
      selection: {
        nodeId: id1,
        start: 2,
        end: 2
      },
      containerIsContentEditable: true
    }
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const container = this.getContainer()
    const isEditable = this.state.containerIsContentEditable
    console.log('document.active -- before comDidUpdate', isEditable, document.activeElement)
    if (isEditable) container.focus()
    console.log('document.active -- after comDidUpdate', document.activeElement)
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
      nodes: this.state.nodes.map(node => Object.assign({}, node, {isContentEditable: null})),
      selection: this.state.selection,
      containerIsContentEditable: true
    }
    this.setState(newState)
  }

  makeNodesContentEditable() {
    const newState = {
      nodes: this.state.nodes.map(node => Object.assign({}, node, {isContentEditable: true})),
      selection: this.state.selection,
      containerIsContentEditable: null
    }
    this.setState(newState)
    const container = this.getContainer()
    console.log('container', container.contentEditable, container, container.setAttribute)
    container.setAttribute('contentEditable', null)
  }

  handleMouseDown() {
    // this.makeParentContentEditable()
  }

  handleMouseUp() {
    // this.makeNodesContentEditable()
  }

  handleKeyDown(e) {
    console.log('container', e.keyCode)
    const selection = getSelection()
    console.log(selection.anchorNode, selection.anchorOffset)
    const domNode = this.refs['container']
    if (e.keyCode === 220) { // \
      if (this.state.containerIsContentEditable) {
        // const bookmark = getCurrentBookMark()
        this.makeNodesContentEditable()
        // if (document.activeElement != document.body) document.activeElement.blur()
        // domNode.focus()
        // restoreCustomBookMark(bookmark)
      }
      else {
        // const bookmark = getCurrentBookMark()
        this.makeParentContentEditable()
        // if (document.activeElement != document.body) document.activeElement.blur()
        // console.log('domNode', domNode)
        // restoreCustomBookMark(bookmark)
      }
    }

    if (e.keyCode === 221) { //]
      setCharRange(domNode, {start: 4, end: 4})
      domNode.focus()
    }

    if (~[37,38,39,40,16,17,18,224].indexOf(e.keyCode)) { // down arrow
      this.makeParentContentEditable()
    }
    console.log('this.state', this.state)
    console.log('this.state', this.state.nodes.toJS())
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
        onKeyDown={::this.handleKeyDown}
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
