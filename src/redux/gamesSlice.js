import { createSlice } from '@reduxjs/toolkit';
import {addHand} from './handsSlice';

let nextGameId = 0;

const initialState = {
  games_list: [],
  activeGameId: -1,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState: initialState,
  reducers: {
    addGame(state, action) {
      console.log('state: ', state);
      const newGameId = nextGameId++;
      state.games_list.push({
        GameId: newGameId,
        DateStarted: action.payload.DateStarted,
        DateLastModified: action.payload.DateLastModified,
        TeamOne: action.payload.TeamOne,
        TeamTwo: action.payload.TeamTwo,
        ScoreOne: action.payload.ScoreOne,
        ScoreTwo: action.payload.ScoreTwo,
        Winner: action.payload.Winner,
        Hands: [],
        MaxHandId: -1,
      });
      state.activeGameId = newGameId;
    },
    updateGame(state, action) {
      state.games_list[action.payload.GameId] = action.payload;
    },
    setActiveGame(state, action) {
      state.activeGameId === action.payload.GameId;
    },
    deleteGame(state, action) {
      state.games_list = state.games_list.filter(item => item.GameId !== action.payload.GameId);
    },
  },
  extraReducers:(builder) => {
    // When a hand is added via the hand slicer then add to game Id hands array
    builder.addCase(addHand, (state, action) => {
      console.log('1')

      state.games_list[action.payload.GameId].Hands.push(action.payload.HandId)
    });
  }
});

export const { addGame, updateGame, setActiveGame, deleteGame } = gamesSlice.actions;

export default gamesSlice.reducer;
