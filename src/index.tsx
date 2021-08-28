import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './fonts.css';
import './index.css';

axios.defaults.adapter = require('axios/lib/adapters/http');

ReactDOM.render(<App />, document.getElementById('root'));
document.getElementById('__render')?.remove();
