export const suits = {
    SPADES: 1,
    CLUBS: 2,
    DIAMONDS: 3,
    HEARTS: 4,
    NO_TRUMPS: 5,
}

export const baseScore = {
    original:{
        SPADES: 40,
        CLUBS: 80,
        DIAMONDS: 120,
        HEARTS: 160,
        NO_TRUMPS: 200,
        MIS: 250,
        OPEN_MIS: 500,
        BLIND_MIS:1000,
    },
    avondale:{
        SPADES: 40,
        CLUBS: 60,
        DIAMONDS: 80,
        HEARTS: 100,
        NO_TRUMPS: 120,
        MIS: 250,
        OPEN_MIS: 500,
        BLIND_MIS:1000,
    },
    perfect:{
        SPADES: 20,
        CLUBS: 40,
        DIAMONDS: 60,
        HEARTS: 80,
        NO_TRUMPS: 100,
        MIS: 150,
        OPEN_MIS: 250,
        HILO: 350,
        DOUBLE_MIS: 450,
        PATASTROPHE: 750,
        BLIND_MIS:1000,
    },
}

export const bets = {
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    MIS: 11,
    OPEN_MIS: 12,
    BLIND_MIS: 13,
    HILO: 14,
    DOUBLE_MIS: 15,
    PATASTROPHE:16,
}