import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '../../components/Text';
import colors from '../../constants/colors';
import { ListItem } from '../../components/ListItem';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  row: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
});

const teamContainer = Score => {
  return (
    <View style={styles.row}>
      <Text style={styles.titleText}>{Score}</Text>
    </View>
  );
};

export const HandListItem = props => {
  const { hand, game, onPress, onDelete } = props;

  return (
    <ListItem onPress={onPress} onDelete={onDelete}>
      <View style={styles.rowContainer}>
        {teamContainer(hand.TeamOneRunningScore)}
        <View style={styles.verticleLine}></View>
        {teamContainer(hand.TeamTwoRunningScore)}
      </View>
    </ListItem>
  );
};
