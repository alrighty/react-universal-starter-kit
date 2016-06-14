import React from 'react';
import { render } from 'react-dom';
import Root from 'app/containers/Root';
import 'isomorphic-fetch';
import 'babel-polyfill';

render(<Root />, document.getElementById('root'));
