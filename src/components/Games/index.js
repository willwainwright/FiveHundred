import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import colors from '../../constants/colors';
import { ListItem, ListSeparator } from './GamesList';
import { NewGameButton } from './NewGameButton';
import { useDispatch, useSelector } from 'react-redux'
import { addGame, deleteGame } from '../../redux/actions/games';
import { EmptyGamesList } from './EmptyGamesList'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});

const simpleGame = () =>
{
  return {
    DateStarted: '2022-06-02 15:34',
    DateFinished: '2022-06-02 16:34',
    TeamOne: 'Phoebe',
    TeamTwo: 'Will',
    ScoreOne: 100,
    ScoreTwo: 500,
    Winner: 2
  }
}

const newGameButtonHandler = (dispatch, games) => {
  dispatch(addGame(simpleGame()));
};

const deleteGameHandler = (dispatch, index) => {
  dispatch(deleteGame(index));
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
        ListEmptyComponent={EmptyGamesList}
        keyExtractor={item => item.GameId}
        renderItem={({item, index}) => (
          <ListItem
            game={item}
            onDelete={() => deleteGameHandler(dispatch, index)}
            onPress={() => alert(item.GameId)}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ListSeparator}
        ListFooterComponent={ListSeparator}
      />
      <NewGameButton onPress={() => newGameButtonHandler(dispatch, games)} />
    </View>
  );
};
