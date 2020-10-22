import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ServiceA } from './components/servicea';
import { ServiceB } from './components/serviceb';
import { ServiceC } from './components/servicec';
import { ServiceD } from './components/serviced';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
<React.StrictMode>
  <ServiceA/>
</React.StrictMode>,
document.getElementById('serviceA')
);

ReactDOM.render(
  <React.StrictMode>
    <ServiceB/>
  </React.StrictMode>,
  document.getElementById('serviceB')
  );

ReactDOM.render(
  <React.StrictMode>
    <ServiceC/>
  </React.StrictMode>,
  document.getElementById('serviceC')
  );

ReactDOM.render(
  <React.StrictMode>
    <ServiceD/>
  </React.StrictMode>,
  document.getElementById('serviceD')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
