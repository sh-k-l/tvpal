import { combineReducers } from 'redux';

import user from './user';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  user,
  loadingBar: loadingBarReducer,
});
