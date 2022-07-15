import { sortArrayBy } from '../../util/array';

const getMaxGameId = (MaxGameId) => {
  return MaxGameId + 1;
}

const calculateScore = (hands) => {

  // Calculate the running score.
  if(hands?.length === 0) return 0;

  let teamOneScore = 0, teamTwoScore = 0;

  // Sort array by handId
  const handsSorted = sortArrayBy(hands, 'HandId')

  // For each object in array
  handsSorted.map(h => {
    teamOneScore += h.TeamOneHandScore;
    teamTwoScore += h.TeamTwoHandScore;
  })

  return {teamOneScore, teamTwoScore};
}

export const updateGame = (state, payload) => {
  return  {       
    ...state,
    Games: state.Games.map((game) => 
      game.GameId === payload.GameId ?
        {...game,       
          DateStarted: payload.DateStarted,
          DateLastModified: payload.DateLastModified,
          TeamOne: payload.TeamOne,
          TeamTwo: payload.TeamTwo,
          ScoreOne: payload.ScoreOne,
          ScoreTwo: payload.ScoreTwo,
          Winner: payload.Winner,
          Hands: payload.Hands}
      : game
    )
  }
}

export const addGame = (state, payload) => {
  const MaxGameId = getMaxGameId(state.MaxGameId);
  return  {       
    ...state,
    Games: [...state.Games, {
      GameId: MaxGameId,
      DateStarted: payload.DateStarted,
      DateLastModified: payload.DateLastModified,
      TeamOne: payload.TeamOne,
      TeamTwo: payload.TeamTwo,
      ScoreOne: payload.ScoreOne,
      ScoreTwo: payload.ScoreTwo,
      Winner: payload.Winner,
      Hands: [],
      MaxHandId: -1
    }
    ],
    MaxGameId: MaxGameId,
    CurrentGameId: MaxGameId
  }
}

export const deleteGame = (state, deleteId) => {
  return  {       
    ...state,
    Games: state.Games.filter((item, index) => index !== deleteId)
  }
}

export const setActiveGame = (state, gameId) => {
  return  {       
    ...state,
    MaxGameId: gameId
  }
}

