import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';

const createStoreWithMiddleware = applyMiddleware()(createStore);
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <App />
        </Provider>, div
  );
});
