import { configureStore } from '@reduxjs/toolkit';
import gamesSlice from './gamesSlice';
import handsSlice from './handsSlice';

export const store = configureStore({
  reducer: {
    games: gamesSlice,
    hands: handsSlice,
  },
});
