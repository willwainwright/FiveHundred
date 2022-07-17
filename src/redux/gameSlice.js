import { createSlice } from '@reduxjs/toolkit';

let nextGameId = 0;

const initialState = {
  games_list: [],
  currentGameId: -1,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState: initialState,
  reducers: {
    addGame(state, action) {
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
      state.currentGameId = newGameId;
    },
    updateGame(state, action) {
      state.games_list[action.payload.GameId] = action.payload;
    },
    setActiveGame(state, action) {
      state.currentGameId === action.payload.GameId;
    },
    deleteGame(state, action) {
      state.currentGameId === action.payload.GameId;
    },
  },
});

export const { addGame, updateGame } = gamesSlice.actions;

export default gamesSlice.reducer;
