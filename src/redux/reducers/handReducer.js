import { ADD_HAND, DELETE_HAND, SET_ACTIVE_HAND } from '../actions/types';
import { GetHands } from '../../Services/Hands'

const initialState = {
  hands: [],
  maxHandId: 0,
  currentHandId: 0
};

const getMaxHandId = (maxHandId) => {
  return maxHandId + 1;
}

const calculateScore = () =>{
   //Calculate score
   let betterHandScore = 0;
   let defenderHandScore = (10 - h.WonAmount) * 10;
   
   let teamOneScore =0, teamTwoScore =0;

   // If its not a special bet
   if(h.Bet < 6) {
     // For every bet above 6 add 100 onto the score
     betterHandScore = ((h.BetAmount - 6) * 100) + baseScore.avondale[h.Bet]
     if(h.WonAmount ===10) betterHandScore = 250;  
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


const addHand = (state, payload) => {
  const maxHandId = getMaxHandId(state.maxHandId);
  const {teamOneScore, teamTwoScore} = calculateScore(hand); 

  return  {       
    ...state,
    hands: [...state.hands, {
      HandId: maxHandId,
      DateEntered: payload.DateEntered,
      Bet: payload.Bet,
      BetAmount: payload.BetAmount,
      WonAmount: payload.WonAmount,
      TeamOneHandScore: teamOneScore,
      TeamTwoHandScore: teamTwoScore,
    }
    ],
    maxHandId: maxHandId,
    currentHandId: maxHandId
  }
}

const deleteHand = (state, deleteId) => {
  return  {       
    ...state,
    hands: state.hands.filter((item, index) => index !== deleteId)
  }
}

const setActiveHand = (state, handId) => {
  return  {       
    ...state,
    maxHandId: handId
  }
}

const handReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_HAND:
      return addHand(state,action.payload );
    case DELETE_HAND:
      return deleteHand(state, action.payload);
    case SET_ACTIVE_HAND:
      return setActiveHand(state, action.payload);
    default:
      return state;
  }
}

export default handReducer;