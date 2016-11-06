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
      }),
      selection: {
        nodeId: id1,
        start: 2,
        end: 2
      }
    }
  }

  componentDidMount() {

  }

  changeName(id, selection) {
    const newState = {
      nodes: this.state.nodes.set(id, {id, name: '12345678'}),
      selection: selection || this.state.selection
    }
    console.log('new selection', newState.selection)
    this.setState(newState)
  }

  render() {
    return <div className={styles.main}>
      <div className={styles.sidebar}>
      </div>
      <div className={styles.content} >
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
