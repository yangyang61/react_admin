import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import memoryUtils from './utils/memoryUtils'
import store from './utils/storageUtils'

const user = store.getUser()
memoryUtils.user = user

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);
