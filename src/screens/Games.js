import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from "expo-status-bar";

import colors from '../constants/colors';
import { ListItem, ListSeparator } from '../components/GamesList';
import { NewGameButton } from '../components/NewGameButton';
import { GetGames } from '../Services/Games';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});

const newGameButtonHandler = () => {
  alert('Start new game');
};



export const Games = ({ navigation }) => {
  return (
  <View style={styles.container}>
    <FlatList
      style={styles.container}
      data={GetGames()}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <ListItem
          game={item}
          onPress={() => alert(item.GameId)}
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
    <NewGameButton onPress={newGameButtonHandler} />
  </View>
  );
};
