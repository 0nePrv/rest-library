import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = document.getElementById('root');

if (root == null) {
  throw new Error('Root can not be null');
}

const container = ReactDOM.createRoot(root);

container.render(<App/>);