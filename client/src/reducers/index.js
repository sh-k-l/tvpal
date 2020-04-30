import { combineReducers } from 'redux';

import user from './user';
import shows from './shows';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  user,
  shows,
  loadingBar: loadingBarReducer,
});
