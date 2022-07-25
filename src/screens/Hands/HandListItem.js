import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Text } from 'components/Text';
import colors from 'constants/colors';
import { ListItem } from 'components/ListItem';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 0,
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
    alignSelf: 'center',
  },
  betAmountText: {
    flex: 1,
    fontSize: 25,
    color: colors.black,
    alignSelf: 'center',
    textAlign: 'left',
    
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
    marginHorizontal: 10,
  },
  betIndContainer: {
    flex: 0.33,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  runningScoreContainer: {
    flex: 0.33,
    flexDirection: 'row',
    alignItems: 'center',
  },
  handScoreContainer: {
    flex: 0.33,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  suitImageStyle: {
    flex: 1,
    height: 20,
    // width: 50,
    resizeMode: 'contain',
  },
});

const addScoreIndicator = scoreChange => {
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
      <Text style={[styles.betAmountText]}>{betAmount}</Text>
      <Image source={bet.imageSource} style={styles.suitImageStyle} />
    </>
  );
};

const TeamContainerLeft = props => {
  const { score, handScore, isBettingTeam, bet, betAmount } = props;
  return (
    <View style={styles.column}>
      <View style={[styles.betIndContainer, {  }]}>{getBetMini(bet, isBettingTeam, betAmount)}</View>
      <View style={styles.runningScoreContainer}>
        <Text style={[styles.titleText, getScoreColor(score)]}>{score}</Text>
      </View>
      <View style={styles.handScoreContainer}>
        <Text style={[styles.handScoreText, { textAlign: 'right' }, getScoreColor(handScore)]}>
          {addScoreIndicator(handScore)}
        </Text>
      </View>
    </View>
  );
};

const TeamContainerRight = props => {
  const { score, handScore } = props;
  return (
    <View style={styles.column}>
      <View style={styles.handScoreContainer}>
        <Text style={[styles.handScoreText, { textAlign: 'left' }, getScoreColor(handScore)]}>
          {addScoreIndicator(handScore)}
        </Text>
      </View>
      <View style={styles.runningScoreContainer}>
        <Text style={[styles.titleText, getScoreColor(score)]}>{score}</Text>
      </View>
      <View style={[styles.betIndContainer, { marginRight: 5 }]}>
        <Text style={[styles.titleText, { textAlign: 'right' }]}>XXX</Text>
      </View>
    </View>
  );
};

export const HandListItem = props => {
  const { hand, onPress, onDelete } = props;
  console.log(hand);
  return (
    <ListItem onPress={onPress} onDelete={onDelete}>
      <View style={styles.rowContainer}>
        <TeamContainerLeft
          score={hand.TeamOneRunningScore}
          handScore={hand.TeamOneHandScore}
          isBettingTeam={hand.BettingTeam === 1 ? true : false}
          bet={hand.Bet}
          betAmount={hand.BetAmount}
        />
        <View style={styles.verticleLine}></View>
        <TeamContainerRight score={hand.TeamTwoRunningScore} handScore={hand.TeamTwoHandScore} />
      </View>
    </ListItem>
  );
};
