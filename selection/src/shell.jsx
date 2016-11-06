import React from 'react'
import styles from './shell.styl'
import Snap from 'snapsvg'

class Shell extends React.Component {


  componentDidMount() {

  }

  shouldComponentUpdate() {
  }

  render() {
    return <div className={styles.main}>
      <div className={styles.sidebar}>
      </div>
      <div className={styles.content} >
        <svg id='svgLand' style={{height: '100%', width: '100%'}}></svg>
      </div>
    </div>
  }
}

export default Shell
