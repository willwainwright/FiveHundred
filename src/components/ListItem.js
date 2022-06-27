import colors from '../constants/colors';

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';


const styles = StyleSheet.create({
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
  const {onPress, onDelete} = props;

  return (
    <Swipeable
        renderRightActions={() => rightSwipeActions(onDelete)} >
      <TouchableOpacity onPress={onPress} >
        {props.children}
      </TouchableOpacity>
    </Swipeable>
  );
};


export const ListSeparator = () => <View style={styles.separator} />;
