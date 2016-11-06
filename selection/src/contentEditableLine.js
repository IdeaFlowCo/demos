import React from 'react'
import styles from './shell.styl'
import { setCharRange } from './selectionModel'
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

  handleClick() {
    const { node, changeName } = this.props
    changeName(node.id)
  }

  componentDidUpdate() {
    const { selection, node } = this.props
    const domNode = ReactDOM.findDOMNode(this)
    if (selection.nodeId === node.id) {
      setCharRange(domNode, selection)
      domNode.focus()
    }
  }

  render() {
    const { node, changeName } = this.props

    return <div
            contentEditable
            className={styles.contenteditableLine}
            onClick={::this.handleClick}
          >
            {node.name}
          </div>
  }
}

export default ContentEditableLine
