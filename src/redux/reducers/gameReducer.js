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

const getHandsForCurrentGame = (CurrentGameId, Games) => {
  const game =  Games.find(x => x.GameId === CurrentGameId);
  return game.Hands;
}

export const updateScore = (state, gameId) => {

  const Hands = getHandsForCurrentGame(gameId, state.Games)
  const {teamOneScore, teamTwoScore} = calculateScore(Hands);
  return  {       
    ...state,
    Games: state.Games.map((game) => 
      game.GameId === gameId ?
        {...game, ScoreOne: teamOneScore, scoreTwo: teamTwoScore}
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
      MaxHandId: 0
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

