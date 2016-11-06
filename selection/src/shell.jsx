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
        [id1]: {id: id1, name: 'malcom'},
        [id2]: {id: id2, name: 'jacob'},
        [id3]: {id: id3, name: 'ali'}
      })
    }
  }

  componentDidMount() {

  }

  shouldComponentUpdate() {
  }

  render() {
    console.log('this.state.nodes', this.state.nodes)
    this.state.nodes.forEach(node => {
      console.log('node', node)
    })
    return <div className={styles.main}>
      <div className={styles.sidebar}>
      </div>
      <div className={styles.content} >
        <div className={styles.lineWrapper}>
          {this.state.nodes.map(node => <ContentEditableLine node={node}/>)}
        </div>
      </div>
    </div>
  }
}

export default Shell
