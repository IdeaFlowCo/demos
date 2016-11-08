import React from 'react'
import styles from './shell.styl'
import { setCharRange, restoreCustomBookMark } from './selectionModel'
import ReactDOM from 'react-dom'


class ContentEditableLine extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // const { selection, node } = this.props
    // const domNode = ReactDOM.findDOMNode(this)
    // if (selection.nodeId === node.id) {
    //   restoreCustomBookMark(domNode, selection)
    // }
  }

  handleKeyDown(e) {
    console.log('handle key down -- content line')
    if (e.keyCode === 13) { // enter
      console.log('enter key content line')
    }
  }

  componentDidUpdate() {
    const { selection, node, rawSelection } = this.props
    console.log('rawSelection', rawSelection)
    const domNode = ReactDOM.findDOMNode(this)
    console.log('containes selection', )
    if (node.isContentEditable && domNode.contains(rawSelection.anchorNode)) {
      setCharRange(rawSelection.anchorNode, {start: rawSelection.anchorOffset, end:rawSelection.anchorOffset})
      domNode.focus()
    }
  }

  render() {
    const { node } = this.props

    return <div
            contentEditable={node.isContentEditable}
            className={styles.contenteditableLine}
            onKeyDown={::this.handleKeyDown}
          >
            {node.name ? node.name : <br/>}
          </div>
  }
}

export default ContentEditableLine
