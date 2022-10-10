import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'src/assets/css/common/index.scss'
import 'src/assets/js/fixScreen'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

