import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '../Text';
import colors from '../../constants/colors';

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
  deleteContainer: {
    flex:1,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width:70,
    paddingRight: 20
  }
});

const rightSwipeActions = (onPress) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.deleteContainer} >
          <Ionicons name={'trash-sharp'} 
                  color={colors.white} 
                  size={30}
          />
      </View>
    </TouchableOpacity>
  );
};


export const ListItem = (props) => {
  const {game, onPress, onDelete} = props;

  return (
    <Swipeable
        renderRightActions={() => rightSwipeActions(onDelete)} >
      <TouchableOpacity onPress={onPress} >
        <View style={styles.row}>
          <Text style={styles.titleText}>{game.TeamOne} v {game.TeamTwo}</Text>
          <Text>{game.ScoreOne} | {game.ScoreTwo}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export const ListSeparator = () => <View style={styles.separator} />;