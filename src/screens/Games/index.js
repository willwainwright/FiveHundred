import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { GameListItem } from './GameListItem';
import { ListSeparator } from '../../components/ListItem';
import { EmptyList } from '../../components/EmptyList';
import { FloatingButton } from '../../components/FloatingButton';
import { useNavigation } from '@react-navigation/native';

export const Games = props => {
  const Games = useSelector(state => state.games);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

  const newGameButtonHandler = () => {
    navigation.navigate('NewGame');
  };

  const deleteGameHandler = index => {
    dispatch(deleteGame(index));
  };

  const openGameHandler = gameId => {
    dispatch(setActiveGame(gameId));
    navigation.navigate('Hands');
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
        data={Games}
        ListEmptyComponent={EmptyList('Tap the + button to create a new game')}
        keyExtractor={item => item.GameId}
        renderItem={({ item, index }) => (
          <GameListItem
            game={item}
            onDelete={() => deleteGameHandler(index)}
            onPress={() => openGameHandler(item.GameId)}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ListSeparator}
        ListFooterComponent={ListSeparator}
      />
      <FloatingButton onPress={() => newGameButtonHandler()} />
    </View>
  );
};
