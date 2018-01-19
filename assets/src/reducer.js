import { combineReducers } from 'redux';
import games from 'Games/reducer';
import auth from 'Auth/reducer';
import path from 'Routing/reducer';
import status from 'Status/reducer';
import monsterhearts from 'Monsterhearts/reducer';

export default combineReducers({
  auth, 
  path, 
  games, 
  status, 
  monsterhearts
});
