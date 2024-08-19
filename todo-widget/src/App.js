import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
