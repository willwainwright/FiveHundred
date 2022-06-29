import { suits, bets, baseScore } from '../../constants/game';

const getMaxHandId = (maxHandId) => {
  return maxHandId + 1;
}

const calculateScore = (h) =>{
   //Calculate score
   let betterHandScore = 0;
   let defenderHandScore = (10 - h.WonAmount) * 10;

   let teamOneScore = 0, teamTwoScore = 0;

   // If its not a special bet
   if(h.Bet < 6) {
     // For every bet above 6 add 100 onto the score
     betterHandScore = ((h.BetAmount - 6) * 100) + baseScore.avondale[h.Bet]
     if(h.WonAmount === 10 && betterHandScore < 250) betterHandScore = 250;
   }
   else  {
    // Set the score to the special amount
     betterHandScore = baseScore.avondale[h.Bet]
   }

   // If the betting team didnt get the desired amount make the score negative
   if(h.WonAmount < h.BetAmount) betterHandScore = betterHandScore * -1;

   // If the betting team was team one then set team one score to that and two to the defender or vice versa
   if(h.BettingTeam === 1) {
    teamOneScore += betterHandScore;
    teamTwoScore += defenderHandScore
  }
  else  {
    teamOneScore += defenderHandScore;
    teamTwoScore += betterHandScore
  }

  return {teamOneScore, teamTwoScore};
}


export const addHand = (state, payload) => {
  const {teamOneScore, teamTwoScore} = calculateScore(payload);
  const gameIndex = state.CurrentGameId;

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
                  TeamOneHandScore: teamOneScore,
                  TeamTwoHandScore: teamTwoScore,
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