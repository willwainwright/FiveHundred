export const bets = {
  SPADES: 1,
  CLUBS: 2,
  DIAMONDS: 3,
  HEARTS: 4,
  NO_TRUMPS: 5,
  MIS: 6,
  OPEN_MIS: 7,
  BLIND_MIS: 8,
  HILO: 9,
  DOUBLE_MIS: 10,
  PATASTROPHE: 11,
};
// This whole thing needs cleaning
export const suits = {
  1: 'Spades',
  2: 'Clubs',
  3: 'Diamonds',
  4: 'Hearts',
  5: 'No trumps',
};

// export const suits = ['SPADES', 'CLUBS','DIAMONDS','HEARTS', 'NO_TRUMPS']

export const baseScore = {
  original: {
    1: 40,
    2: 80,
    3: 120,
    4: 160,
    5: 200,
    6: 250,
    7: 500,
    8: 1000,
  },
  avondale: {
    1: 40,
    2: 60,
    3: 80,
    4: 100,
    5: 120,
    6: 250,
    7: 500,
    8: 1000,
  },
  perfect: {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 100,
    6: 150,
    7: 250,
    9: 350,
    10: 450,
    11: 750,
    8: 1000,
  },
};
