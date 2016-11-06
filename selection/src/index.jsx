import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';
import Shell from './shell'

if (module.hot) module.hot.accept()
  
console.error = (function(_error) {
  return function(message) {
    if (typeof message !== 'string' || message.indexOf('component is `contentEditable`') === -1) {
      _error.apply(console, arguments)
    }
  }
})(console.error)


ReactDOM.render(
  <Shell />,
  document.getElementById('root')
);
