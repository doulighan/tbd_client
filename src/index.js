import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import actionCable from 'actioncable'

const CableApp = {}

CableApp.cable = actionCable.createConsumer(`ws://${window.location.hostname}:3000/test`)

console.log(CableApp)
ReactDOM.render(<App cableApp={CableApp} />, document.getElementById('root'));

registerServiceWorker();
