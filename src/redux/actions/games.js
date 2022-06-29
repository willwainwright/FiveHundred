import { ADD_GAME, DELETE_GAME, SET_ACTIVE_GAME, UPDATE_GAME_SCORE } from './types';

export const addGame = game => {
  return {
    type: ADD_GAME,
    payload: game
  }
}

export const deleteGame = gameId => {
  return {
    type: DELETE_GAME,
    payload: gameId
  }
}

export const setActiveGame = gameId => {
  return {
    type: SET_ACTIVE_GAME,
    payload: gameId
  }
}

export const updateScore = gameId => {
  return {
    type: UPDATE_GAME_SCORE,
    payload: gameId
  }
}