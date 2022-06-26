import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from './Text';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
    alignItems : 'center'
  },
  titleText: {
    fontWeight: 'bold',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});

export const ListItem = (props) => {
  const {game, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.titleText}>{game.TeamOne} v {game.TeamTwo}</Text>
        <Text>{game.ScoreOne} | {game.ScoreTwo}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ListSeparator = () => <View style={styles.separator} />;
