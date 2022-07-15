
import { calculateRunningScore} from '../../util/scoreCalculator';

const getMaxHandId = (maxHandId) => {
  return maxHandId + 1;
}

export const addHand = (state, payload) => {
  const gameIndex = state.CurrentGameId;
 
  const {teamOneRunningScore, teamTwoRunningScore} = calculateRunningScore(state.Games[gameIndex], payload.TeamOneScore, payload.TeamTwoScore)
  

  return {...state, Games: state.Games.map((game) =>
    game.GameId === gameIndex ?
        {
            ...game,
            Hands : [
                ...game.Hands,
                {
                  HandId: getMaxHandId(game.MaxHandId) ,
                  DateEntered: payload.DateEntered,
                  Bet: payload.Bet,
                  BetAmount: payload.BetAmount,
                  WonAmount: payload.WonAmount,
                  TeamOneHandScore: payload.TeamOneScore,
                  TeamTwoHandScore: payload.TeamTwoScore,
                  RunningTeamOneScore: teamOneRunningScore,
                  RunningTeamTwoScore: teamTwoRunningScore
                }
            ],
            MaxHandId: getMaxHandId(game.MaxHandId),
        }
        : game
    )}
  }

export const deleteHand = (state, deleteId) => {
  return  {
    ...state,
    hands: state.hands.filter((item, index) => index !== deleteId)
  }
}

export const setActiveHand = (state, handId) => {
  return  {
    ...state,
    maxHandId: handId
  }
}

const handReducer = (state = initialState, action) => {
  switch(action.type) {
  }
}

export default handReducer;