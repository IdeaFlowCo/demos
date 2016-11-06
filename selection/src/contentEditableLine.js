import React from 'react'
import styles from './shell.styl'

class ContentEditableLine extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  shouldComponentUpdate() {
  }

  render() {
    console.log('this.props.node.name', this.props.node.name)
    return <div
            contentEditable
            className={styles.contenteditableLine}>
            {this.props.node.name}
          </div>
  }
}

export default ContentEditableLine
