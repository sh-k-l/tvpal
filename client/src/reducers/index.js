import { combineReducers } from 'redux';

import user from './user';
import shows from './shows';
import episodes from './episodes';
import modals from './modals';
import alerts from './alerts';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  user,
  shows,
  episodes,
  modals,
  alerts,
  loadingBar: loadingBarReducer,
});
