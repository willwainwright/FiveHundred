import { ADD_GAME, DELETE_GAME } from '../actions/types';
import { GetGames } from '../../Services/Games'

const initialState = {
  games: [],
  maxGameId:0
};

const getMaxGameId = (maxGameId) => {
  return maxGameId+1;
}


const addGame = (state, payload) => {
  const maxGameId = getMaxGameId(state.maxGameId);
  return  {       
    ...state,
    games: [...state.games, {
      GameId: maxGameId,
      DateStarted: payload.DateStarted,
      DateFinished: payload.DateFinished,
      TeamOne: payload.TeamOne,
      TeamTwo: payload.TeamTwo,
      ScoreOne: payload.ScoreOne,
      ScoreTwo: payload.ScoreTwo,
      Winner: payload.Winner
    }
    ],
    maxGameId: maxGameId
  }
}

const deleteGame = (state, deleteId) => {
  return  {       
    ...state,
    games: state.games.filter((item, index) => index !== deleteId)
  }
}

const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_GAME:
      return addGame(state,action.payload );
    case DELETE_GAME:
      return deleteGame(state, action.payload);
    default:
      return state;
  }
}

export default gameReducer;