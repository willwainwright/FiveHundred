import { createSlice } from '@reduxjs/toolkit';
import {setActiveGame} from './gamesSlice';

const initialState = {
  handsList: [],
  active_game_hands: [],
  activeHandId: -1,
};

const handsSlice = createSlice({
  name: 'hands',
  initialState: initialState,
  reducers: {
    addHand(state, action) {
      state.handsList.push({
        HandId: action.payload.HandId,
        DateEntered: action.payload.DateEntered,
        Bet: action.payload.Bet,
        BetAmount: action.payload.BetAmount,
        WonAmount: action.payload.WonAmount,
        TeamOneHandScore: action.payload.TeamOneScore,
        TeamTwoHandScore: action.payload.TeamTwoScore,
      });

      state.active_game_hands.push({
        HandId: action.payload.HandId,
        DateEntered: action.payload.DateEntered,
        Bet: action.payload.Bet,
        BetAmount: action.payload.BetAmount,
        WonAmount: action.payload.WonAmount,
        TeamOneHandScore: action.payload.TeamOneScore,
        TeamTwoHandScore: action.payload.TeamTwoScore,
      });

      state.activeHandId = action.payload.HandId;
    },
    updateHand(state, action) {
      state.handsList[action.payload.HandId] = action.payload;
    },
    setActiveHand(state, action) {
      state.activeHandId === action.payload.HandId;
    },
    deleteHand(state, action) {
      state.handsList = state.handsList.filter(
        item => item.HandId !== action.payload.HandId,
      );
    },
    setActiveHandList(state, action) {
      state.active_game_hands = state.handsList.filter(hand =>
        action.payload.includes(hand.HandId),
      );
    },
  },
  // extraReducers:(builder) => {
  //   // When the game is set, filter the active hands
  //   builder.addCase(setActiveGame, (state, action) => {
  //     // Payload == game Id
  //     // Get active game
  //     const activeGame = 

  //     state.active_game_hands = state.handsList.filter(hand => action.payload.includes(hand.HandId))
  //     });
  //   }
  });

export const { addHand, updateHand, setActiveHand, deleteHand, setActiveHandList } = handsSlice.actions;

export default handsSlice.reducer;
