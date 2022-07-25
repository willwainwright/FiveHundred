import { suits, bets, baseScore, betsV2, pointsSystem } from 'constants/game';

export const calculateRunningScore = (hands) => {
  let handsCopy = [...hands];

  if(hands.length ===0) {
    return hands;
  }

  let teamOneRunningScore = 0,
    teamTwoRunningScore = 0
        
  let final = handsCopy.map(v => {v.RunningTeamOneScore =(teamOneRunningScore += v.TeamOneScore), v.RunningTeamTwoScore =(teamTwoRunningScore += v.TeamTwoScore); return v});

  return final
    
};

export const calculatePotentialScore = (Bet, BetAmount, bettingsystem = pointsSystem.avondale) => {
  let betterHandScore = 0;
  // If its not a special bet
  if (!Bet.SpecialBet) {
    // For every bet above 6 add 100 onto the score
    betterHandScore = (BetAmount - 6) * 100 + Bet.Value[bettingsystem]

    if (BetAmount === 10 && betterHandScore < 250) {
      betterHandScore = 250;

      return betterHandScore;
    }
  } else {
    // Set the score to the special amount
    betterHandScore = Bet.Value[bettingsystem];
    return betterHandScore;
  }
  return betterHandScore;
};

export const calculateHandScore = (Bet, TricksWon, TricksBet, BettingTeam, bettingsystem = pointsSystem.avondale) => {
  let betterHandScore = 0;
  let defenderHandScore = (10 - TricksWon) * 10;

  // If its not a special bet
  if (!Bet.SpecialBet) {
    // For every bet above 6 add 100 onto the score
    betterHandScore = (TricksBet - 6) * 100 + Bet.Value[bettingsystem]

    if (TricksWon === 10 && betterHandScore < 250) {
      betterHandScore = 250;
    }

    if (TricksWon < TricksBet) {
      betterHandScore = betterHandScore * -1;
    }

  } else if (Bet.MisereBet){
    // Misere betting. If the better lost all the tricks they get full points
    if(TricksWon === 0) {
      // Set the score to the special amount
      betterHandScore = Bet.Value[bettingsystem];      
    }
    else {
      // If they won even one hand then they lost
      betterHandScore = Bet.Value[bettingsystem] * -1;
    }

    // Defending team dont get anything
    defenderHandScore = 0;
  }
  else {
    // Set the score to the special amount
    betterHandScore = et.Value[bettingsystem];

    if (TricksWon < TricksBet) {
      betterHandScore = betterHandScore * -1;
    }
  }

  const teamOneScoreChange = BettingTeam === 1 ? betterHandScore : defenderHandScore;
  const teamTwoScoreChange = BettingTeam === 2 ? betterHandScore : defenderHandScore;

  return { teamOneScoreChange, teamTwoScoreChange };
};
