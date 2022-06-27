import { ADD_HAND, DELETE_HAND, SET_ACTIVE_HAND } from './types';

export const addHand = HAND => {
  return {
    type: ADD_HAND,
    payload: HAND
  }
}

export const deleteHand = handId => {
  return {
    type: DELETE_HAND,
    payload: handId
  }
}

export const setActiveHand = handId => {
  return {
    type: SET_ACTIVE_HAND,
    payload: handId
  }
}