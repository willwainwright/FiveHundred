import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hands_list: [],
  active_game_hands: [],
  activeHandId: -1,
};

const handsSlice = createSlice({
  name: 'hands',
  initialState: initialState,
  reducers: {
    addHand(state, action) {
      state.hands_list.push({
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
      state.hands_list[action.payload.HandId] = action.payload;
    },
    setActiveHand(state, action) {
      state.activeHandId === action.payload.HandId;
    },
    deleteHand(state, action) {
      state.hands_list = state.hands_list.filter(
        item => item.HandId !== action.payload.HandId,
      );
    },
    getHandsByGame(state, action) {
      state.active_game_hands = state.hands_list.filter(hand =>
        action.payload.includes(hand.HandId),
      );
    },
  },
});

export const { addHand, updateHand, setActiveHand, deleteHand, getHandsByGame } = handsSlice.actions;

export default handsSlice.reducer;
