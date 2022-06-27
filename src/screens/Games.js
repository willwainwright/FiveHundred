import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import colors from '../constants/colors';
import { GameListItem } from '../components/Games/GameListItem';
import { ListSeparator } from '../components/ListItem';
import { EmptyList } from '../components/EmptyList'
import { FloatingButton } from '../components/FloatingButton';
import { deleteGame, setActiveGame } from '../redux/actions/games';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});


const newGameButtonHandler = (navigation) => {
  navigation.navigate('NewGame');
};

const deleteGameHandler = (dispatch, index) => {
  dispatch(deleteGame(index));
};

const openGameHandler = (dispatch, navigation, gameId) => {
  dispatch(setActiveGame(gameId));
  navigation.navigate('Hands');
};

export const Games = ({ navigation }) => {
  const games = useSelector(state => state.games)
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
        data={games}
        ListEmptyComponent={EmptyList("Tap the + button to create a new game")}
        keyExtractor={item => item.GameId}
        renderItem={({item, index}) => (
          <GameListItem
            game={item}
            onDelete={() => deleteGameHandler(dispatch, index)}
            onPress={() => openGameHandler(dispatch, navigation, item.GameId)}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ListSeparator}
        ListFooterComponent={ListSeparator}
      />
      <FloatingButton onPress={() => newGameButtonHandler(navigation)} />
    </View>  
  );
};
