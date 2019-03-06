import React, { Component } from 'react';
import './App.css';

import LandingContainer from './containers/landingContainer';
import { createStore, applyMiddleware, compose } from 'redux';
import { reducers, searchForOauthInfos } from './redux/store';

import { Provider, connect } from 'react-redux';

import {
  Form
} from 'antd';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}


const store = createStore(
  reducers,
  compose(
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

searchForOauthInfos(store.dispatch);

// DEBUG PURPOSE ONLY
const unsub = store.subscribe(() => {
  console.log(store.getState())
});

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const logged = this.props.logged;
    let content;
    if (!logged) {
      return (
        // <LoginModal />
        <LandingContainer />
      );
    }else{
      return (
        <div>
          It works!
        </div>
      );
    }

  }
}

const mapStateToProps = state => {
  return {
    logged: state.logged
  }
}

const mapDispatchToProps = dispatch => {
  return {};
}


const AppWithStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

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
