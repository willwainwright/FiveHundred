import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import colors from '../../constants/colors';
import { HandListItem } from './HandListItem';
import { HandsHeader } from './HandsHeader';
import { ListSeparator } from '../../components/ListItem';
import { EmptyList } from '../../components/EmptyList';
import { FloatingButton } from '../../components/FloatingButton';
import { getHandsByGame } from '../../redux/handsSlice';

export const Hands = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [completedGame, setCompletedGame] = React.useState(false);
  const CurrentGameId = useSelector(state => state.games.activeGameId);
  const game = useSelector(state => state.games.games_list[CurrentGameId]);
  const hands = useSelector(state => state.hands.active_game_hands);
  const stet = useSelector(state => state.hands);

  useEffect(() => {
    if (game?.ScoreOne >= 500 || game?.ScoreTwo >= 500) {
      setCompletedGame(true);
    }
  }, []);

  useEffect(() => {
    dispatch(getHandsByGame(game.Hands));
    console.log(stet)
  }, [CurrentGameId]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    columns: {
      flex: 1,
      backgroundColor: colors.background,
    },
    verticleLine: {
      height: '100%',
      width: 1,
      backgroundColor: '#909090',
    },
    fireworks: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
    },
  });

  const newHandButtonHandler = gameId => {
    navigation.navigate('NewHand');
  };

  const deleteHandHandler = index => {
    // dispatch(deleteGame(index));
    alert('Delete Hand');
  };

  return (
    <View style={styles.container}>
      {HandsHeader(game)}
      <FlatList
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
        data={hands}
        ListEmptyComponent={EmptyList('Tap the + button to start a new hand')}
        keyExtractor={item => item.HandId}
        renderItem={({ item, index }) => (
          <HandListItem
            hand={item}
            game={game}
            onDelete={() => deleteHandHandler(index)}
            onPress={() => alert('Edit hand: ' + item.HandId)}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ListSeparator}
        ListFooterComponent={ListSeparator}
      />
      <FloatingButton onPress={() => newHandButtonHandler(CurrentGameId)} />
      {completedGame && (
        <Image
          source={require('../../../assets/fireworks.gif')}
          style={styles.fireworks}
        />
      )}
    </View>
  );
};
