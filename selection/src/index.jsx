import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';
import Shell from './shell'

if (module.hot) module.hot.accept()

ReactDOM.render(
  <Shell />,
  document.getElementById('root')
);


