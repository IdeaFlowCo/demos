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
    const id4 = uuid.v4()
    this.state = {
      nodes: Map({
        [id1]: {id: id1, name: 'malcom', isContentEditable: null},
        [id2]: {id: id2, name: 'jacob', isContentEditable: null},
        [id4]: {id: id4, name: '', isContentEditable: null},
        [id3]: {id: id3, name: 'ali', isContentEditable: null}
      }),
      selection: {
        nodeId: id1,
        start: 2,
        end: 2
      },
      containerIsContentEditable: true,
      rawSelection: {}
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
    console.log('compDidUpdate -- nodes', this.state.nodes.toJS())
  }

  getContainer() {
    return this.refs['container']
  }

  makeParentContentEditable() {
    const newState = {
      nodes: this.state.nodes.map(node => Object.assign({}, node, {isContentEditable: null})),
      selection: this.state.selection,
      containerIsContentEditable: true,
      rawSelection: getSelection()
    }
    this.setState(newState)
  }

  makeNodesContentEditable() {
    const newState = {
      nodes: this.state.nodes.map(node => Object.assign({}, node, {isContentEditable: true})),
      selection: this.state.selection,
      containerIsContentEditable: null,
      rawSelection: getSelection()
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

  // createNodeAfter(id) {
    
  // }

  createNode() {
    const newId = uuid.v4()
    const newState = {
      nodes: this.state.nodes.set(newId, {id: newId, name: '', isContentEditable: this.state.containerIsContentEditable ? null : true}),
      selection: this.state.selection,
      containerIsContentEditable: this.state.containerIsContentEditable,
      rawSelection: getSelection()
    }
    console.log('newState.nodes', newState.nodes.toJS())
    this.setState(newState)
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

    if (e.keyCode === 13) { // enter
      console.log('e.keycode enter container')
      e.preventDefault()
      this.makeNodesContentEditable()
      // this.createNode() // createNodeAfter
      return
    }

    if (~[37,38,39,40,16,17,18,224].indexOf(e.keyCode)) { // down arrow
      this.makeParentContentEditable()
    }
    console.log('this.state', this.state)
    console.log('this.state', this.state.nodes.toJS())
  }

  render() {
    console.log('container render', this.state.nodes.toJS())
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
              rawSelection={this.state.rawSelection}
              createNode={::this.createNode}
            />
          ))}
        </div>
      </div>
    </div>
  }
}

export default Shell
