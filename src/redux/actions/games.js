import { ADD_GAME, DELETE_GAME } from './types';

export const addGame = game => {
  return {
    type: ADD_GAME,
    payload: game
  }
}

export const deleteGame = game => {
  return {
    type: DELETE_GAME,
    payload: game
  }
}