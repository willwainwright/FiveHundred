import { ADD_GAME, DELETE_GAME, SET_ACTIVE_GAME, UPDATE_GAME_SCORE, UPDATE_GAME } from '../actions/types';
import { ADD_HAND, DELETE_HAND, SET_ACTIVE_HAND } from '../actions/types';
import {addGame, deleteGame, setActiveGame, updateGame, updateScore } from './gameReducer'
import {addHand, deleteHand, setActiveHand } from './handReducer'

const initialState = {
    Games: [],
    MaxGameId:0,
    CurrentGameId: 0
  };
  
  const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_GAME:
            return addGame(state,action.payload );
        case DELETE_GAME:
            return deleteGame(state, action.payload);
        case SET_ACTIVE_GAME:
            return setActiveGame(state, action.payload);
        case UPDATE_GAME_SCORE:
            return updateScore(state, action.payload);
        case UPDATE_GAME:
            return updateGame(state, action.payload);
        case ADD_HAND:
            return addHand(state, action.payload );
        case DELETE_HAND:
            return deleteHand(state, action.payload);
        case SET_ACTIVE_HAND:
            return setActiveHand(state, action.payload);
        default:
            return state;
    }
  }

  export default reducer