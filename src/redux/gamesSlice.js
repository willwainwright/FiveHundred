import { createSlice } from '@reduxjs/toolkit';

let nextGameId = 0;
let nextHandId = 0;

const initialState = {
  gamesList: [],
  handsList: [],
  activeHandsList: [],
  activeGameId: -1,
  activeHandId: -1,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState: initialState,
  reducers: {
    addGame(state, action) {
      const newGameId = nextGameId++;
      state.gamesList.push({
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
      state.gamesList[action.payload.GameId] = action.payload;
    },
    setActiveGame(state, action) {
      state.activeGameId === action.payload;

      const activeGameObj = state.gamesList[action.payload];

      state.activeHandsList = state.handsList.filter(hand => activeGameObj?.Hands.includes(hand.HandId));
    },
    deleteGame(state, action) {
      state.gamesList = state.gamesList.filter(item => item.GameId !== action.payload.GameId);
    },
    // Hand level stuff
    addHand(state, action) {
      
      const newHandId = nextHandId++;
      // Calculate running score
      const teamOneRunningScore = state.activeHandsList.reduce((acc, current) => (acc += current.TeamOneHandScore), 0);
      const teamTwoRunningScore = state.activeHandsList.reduce((acc, current) => (acc += current.TeamTwoHandScore), 0);

      const newHand = {
        HandId: newHandId,
        DateEntered: action.payload.DateEntered,
        Bet: action.payload.Bet,
        BetAmount: action.payload.BetAmount,
        WonAmount: action.payload.WonAmount,
        TeamOneHandScore: action.payload.TeamOneScore,
        TeamTwoHandScore: action.payload.TeamTwoScore,
        TeamOneRunningScore: teamOneRunningScore + action.payload.TeamOneScore,
        TeamTwoRunningScore: teamTwoRunningScore + action.payload.TeamTwoScore,
      };

      state.handsList.push(newHand);
      state.activeHandsList.push(newHand);

      state.activeHandId = action.payload.HandId;

      // Add Id to game hand list
      state.gamesList[state.activeGameId].Hands.push(action.payload.HandId);
    },

    updateHand(state, action) {
      state.handsList[action.payload.HandId] = action.payload;
    },
    setActiveHand(state, action) {
      state.activeHandId === action.payload.HandId;
    },
    deleteHand(state, action) {
      state.handsList = state.handsList.filter(item => item.HandId !== action.payload);

      // Filter out the deleted hand and Recalculate the running score for the active hand list
      state.activeHandsList = state.activeHandsList
        .filter(item => item.HandId !== action.payload)
        .map((obj, index, self) => {
          if (index == 0) {
            obj.TeamOneRunningScore = obj.TeamOneHandScore;
            obj.TeamTwoRunningScore = obj.TeamTwoHandScore;
            return obj;
          }

          const prevO = self[index - 1];
          obj.TeamOneRunningScore = prevO.TeamOneRunningScore + obj.TeamOneHandScore;
          obj.TeamTwoRunningScore = prevO.TeamTwoRunningScore + obj.TeamTwoHandScore;
          return obj;
        });

      // if the hand exists in the active hand list, updated the full hand list
      state.handsList = state.handsList.map(hand => {
        const newHand = state.activeHandsList.find(i2 => i2.HandId === hand.HandId);
        return newHand ? { ...hand, ...newHand } : hand;
      });
    },
    setActiveHandList(state, action) {
      state.activeHandsList = state.handsList.filter(hand => action.payload.includes(hand.HandId));
    },
  },
});

export const {
  addGame,
  updateGame,
  setActiveGame,
  deleteGame,
  addHand,
  updateHand,
  setActiveHand,
  deleteHand,
  setActiveHandList,
} = gamesSlice.actions;

export default gamesSlice.reducer;
