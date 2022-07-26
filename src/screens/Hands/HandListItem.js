import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Text } from 'components/Text';
import colors from 'constants/colors';
import { ListItem } from 'components/ListItem';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'stretch',
    backgroundColor: colors.white,
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 0
  },
  titleText: {
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    alignSelf: 'center',
  },
  handScoreText: {
    flex: 1,
    fontSize: 15,
    alignSelf: 'center'
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
    marginHorizontal: 0,
  },
  runningScoreContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  handScoreContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  betIndContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  suitImageStyle: {
    flex: 1,
    height: 20,
    resizeMode: 'contain',
  },
  betAmountText: {
    flex: 1,
    fontSize: 20,
    color: colors.black,
    alignSelf: 'center',
    textAlign: 'right',    
  },
});

const getHandScore = (scoreChange, index) => {
  if(index ===0) return;
  
  if (scoreChange > 0) {
    return '+' + scoreChange;
  } else {
    return scoreChange;
  }
};

const getScoreColor = scoreChange => {
  if (scoreChange < 0) {
    return { color: colors.red };
  }
};

const getBetMini = (bet, isBettingTeam, betAmount) => {
  if (!isBettingTeam) return null;
  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.betAmountText]}>{betAmount}</Text>
        <Image style={styles.suitImageStyle} source={bet.imageSource}  />
      </View>
    </>
  );
};

const TeamContainerLeft = props => {
  const { score, handScore, isBettingTeam, bet, betAmount, index } = props;
  return (
    <View style={styles.column}>
      <View style={[styles.betIndContainer, {  }]}>{getBetMini(bet, isBettingTeam, betAmount)}</View>
      <View style={styles.runningScoreContainer}>
        <Text style={[styles.titleText, getScoreColor(score)]}>{score}</Text>
      </View>
      <View style={styles.handScoreContainer}>
        <Text style={[styles.handScoreText, { textAlign: 'right', paddingRight:10 }, getScoreColor(handScore)]}>
          {getHandScore(handScore, index)}
        </Text>
      </View>
    </View>
  );
};

const TeamContainerRight = props => {
  const { score, handScore, isBettingTeam, bet, betAmount, index } = props;
  return (
    <View style={styles.column}>
      <View style={styles.handScoreContainer}>
        <Text style={[styles.handScoreText, { textAlign: 'left', paddingLeft:10 }, getScoreColor(handScore)]}>
          {getHandScore(handScore, index)}
        </Text>
      </View>
      <View style={styles.runningScoreContainer}>
        <Text style={[styles.titleText, getScoreColor(score)]}>{score}</Text>
      </View>
      <View style={[styles.betIndContainer, {  }]}>{getBetMini(bet, isBettingTeam, betAmount)}</View>
    </View>
  );
};

export const HandListItem = props => {
  const { hand, onPress, onDelete, index } = props;

  return (
    <ListItem onPress={onPress} onDelete={onDelete}>
      <View style={styles.rowContainer}>
         <TeamContainerLeft
          score={hand.TeamOneRunningScore}
          handScore={hand.TeamOneHandScore}
          isBettingTeam={hand.BettingTeam === 1 ? true : false}
          bet={hand.Bet}
          betAmount={hand.BetAmount}
          index = {index}
        />
         <View style={styles.verticleLine}></View>
        <TeamContainerRight score={hand.TeamTwoRunningScore} handScore={hand.TeamTwoHandScore} 
          isBettingTeam={hand.BettingTeam === 2 ? true : false}
          bet={hand.Bet}
          betAmount={hand.BetAmount}
          index = {index}
          />  
      </View>
    </ListItem>
  );
};
