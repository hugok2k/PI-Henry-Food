import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk'; // nos permite usar acciones asíncronas

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
); // si estamos en desarrollo, usamos el devtools

export default store;
