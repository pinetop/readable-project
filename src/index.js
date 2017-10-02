import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/home';
import PostDetail from './components/postDetail';
import registerServiceWorker from './registerServiceWorker';

import { createStore,combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers';

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import thunk from 'redux-thunk';

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(reducers,  applyMiddleware(thunk,middleware));


ReactDOM.render(

  <Provider store={store}>


    <ConnectedRouter history={history}>
    <div>

      <Route exact path="/" component={Home}/>
      <Route exact path="/post/:post_id" component={PostDetail} />

    </div>
  </ConnectedRouter>



  </Provider>

  , document.getElementById('root'));
registerServiceWorker();
