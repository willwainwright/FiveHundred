import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '../Text';
import colors from '../../constants/colors';
import {ListItem} from '../ListItem';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row", 
    height: 55,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  row: {
    flex:1,
    backgroundColor: colors.white,
    alignItems : 'center',
  },
  titleText: {
    // fontWeight: 'bold',
    fontSize: 30
  },
  verticleLine:{
    height: '100%',
    width:1,
    backgroundColor: '#909090',
  }
});

const teamContainer = (Score) => {
  return (
      <View style={styles.row}>
        <Text style={styles.titleText}>{Score}</Text>
      </View>
  )
}

export const HandListItem = (props) => {
  const {hand, onPress, onDelete} = props;

  return (
    <ListItem onPress={onPress} onDelete={onDelete}>
      <View style={styles.rowContainer}>
        {teamContainer(hand.HandId)}
      <View style={styles.verticleLine}></View>
        {teamContainer(hand.HandId)}
      </View>

     </ListItem>
  );
};
