import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import the global stylesheet so that it applies to the entire app.  The
// original CSS from the static site has been copied into styles.css.  If
// you choose to modularize your styles later, remove this import and
// import the styles into individual components instead.
import './styles.css';

// React 18 API: createRoot hydrates the DOM element with your React
// component tree.  This corresponds to the root div defined in
// index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);