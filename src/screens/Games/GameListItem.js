import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from 'components/Text';
import colors from 'constants/colors';
import { ListItem } from 'components/ListItem';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
  },
});

export const GameListItem = props => {
  const { game, onPress, onDelete } = props;

  return (
    <ListItem onPress={onPress} onDelete={onDelete}>
      <View style={styles.row}>
        <Text style={styles.titleText}>
          {game.TeamOne} v {game.TeamTwo}
        </Text>
        <Text>
          {game.ScoreOne} | {game.ScoreTwo}
        </Text>
      </View>
    </ListItem>
  );
};
