import { suits, bets, baseScore } from '../constants/game';

export const calculateRunningScore = (
  game,
  teamOneHandScore,
  teamTwoHandScore,
) => {
  let teamOneRunningScore = 0,
    teamTwoRunningScore = 0,
    previousTeamOneHand = 0,
    previousTeamTwoHand = 0;

  if (game.Hands.length > 0) {
    const previousHand = game.Hands[game.MaxHandId];

    previousTeamOneHand = previousHand?.RunningTeamOneScore;
    previousTeamTwoHand = previousHand?.RunningTeamTwoScore;
  }
  teamOneRunningScore = previousTeamOneHand + teamOneHandScore;
  teamTwoRunningScore = previousTeamTwoHand + teamTwoHandScore;

  return { teamOneRunningScore, teamTwoRunningScore };
};

export const calculatePotentialScore = (Bet, BetAmount) => {
  let betterHandScore = 0;
  // If its not a special bet
  if (Bet < 6) {
    // For every bet above 6 add 100 onto the score
    betterHandScore = (BetAmount - 6) * 100 + baseScore.avondale[Bet];

    if (BetAmount === 10 && betterHandScore < 250) {
      betterHandScore = 250;

      return betterHandScore;
    }
  } else {
    // Set the score to the special amount
    betterHandScore = baseScore.avondale[Bet];
    return betterHandScore;
  }
  return betterHandScore;
};

export const calculateHandScore = (Bet, TricksWon, TricksBet, BettingTeam) => {
  let betterHandScore = 0;
  let defenderHandScore = (10 - TricksWon) * 10;

  // If its not a special bet
  if (Bet < 6) {
    // For every bet above 6 add 100 onto the score
    betterHandScore = (TricksBet - 6) * 100 + baseScore.avondale[Bet];

    if (TricksWon === 10 && betterHandScore < 250) {
      betterHandScore = 250;
    }
  } else {
    // Set the score to the special amount
    betterHandScore = baseScore.avondale[Bet];
  }

  if (TricksWon < TricksBet) {
    betterHandScore = betterHandScore * -1;
  }

  const teamOneScoreChange =
    BettingTeam === 1 ? betterHandScore : defenderHandScore;
  const teamTwoScoreChange =
    BettingTeam === 2 ? betterHandScore : defenderHandScore;

  return { teamOneScoreChange, teamTwoScoreChange };
};
