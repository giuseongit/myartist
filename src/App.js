import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';

import LandingContainer from './containers/landingContainer';
import DashboardContainer from './containers/dashboardContainer';
import { reducers, searchForOauthInfos } from './utils/store';

import './App.css';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

const redux_devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let middlewares = null;

if(redux_devtools){
  middlewares = compose(
    applyMiddleware(logger),
    redux_devtools
  )
} else {
  middlewares = applyMiddleware(logger)
}

const store = createStore(
  reducers,
  middlewares
);

searchForOauthInfos(store.dispatch);

// DEBUG PURPOSE ONLY
// eslint-disable-next-line no-unused-vars
const unsub = store.subscribe(() => {
  console.log(store.getState());
});

class App extends Component {
  render() {
    const logged = this.props.logged;
    if (!logged) {
      return (
        <LandingContainer />
      );
    }else{
      return (
        <DashboardContainer />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    logged: state.logged
  };
}

const mapDispatchToProps = dispatch => {
  return {};
}


const AppWithStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

class WrappedApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithStore />
      </Provider>
    );
  }
}

export default WrappedApp;
