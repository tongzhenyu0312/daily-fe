import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import App from './App';

const timePassed = observable({
  seconds: 0,
})

setInterval(() => { 
  timePassed.seconds++;
}, 1000);

ReactDOM.render(
  <Provider>
    <App timePassed={ timePassed }/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
