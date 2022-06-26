import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import colors from '../constants/colors';
import { suits, bets } from '../constants/game';
import { ListItem, ListSeparator } from '../components/Games/GamesList';
import { EmptyList } from '../components/EmptyList'
import { FloatingButton } from '../components/FloatingButton';
import { addGame, deleteGame } from '../redux/actions/games';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});

const simpleHand = () =>
{
  return [{
    HandId:0,
    DateEntered: '2022-06-02 15:34',
    BettingTeam: 1,
    Bet: bets.SEVEN,
    Suit: suits.DIAMONDS,
    Won: 0
  }]
}

const newHandButtonHandler = (dispatch, navigation) => {
    // navigation.navigate('NewGame');
    // dispatch(addGame(simpleGame()));
    alert('New Hand');
};

const deleteHandHandler = (dispatch, index) => {
  // dispatch(deleteGame(index));
  alert('Delete Hand');
};

const getHands = (currentGameId) =>{
  if(currentGameId ===0) return [];
  return simpleHand();
}

export const Hands = ({ navigation }) => {
  const currentGameId = useSelector(state => state.currentGameId)
  const dispatch = useDispatch()

  const hands = getHands(currentGameId);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
        data={hands}
        ListEmptyComponent={EmptyList("Tap the + button to start a new hand")}
        keyExtractor={item => item.GameId}
        renderItem={({item, index}) => (
          <ListItem
            game={item}
            onDelete={() => deleteHandHandler(dispatch, index)}
            onPress={() => alert('Edit hand: ' + item.HandId )}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ListSeparator}
        ListFooterComponent={ListSeparator}
      />
      <FloatingButton onPress={() => newHandButtonHandler(dispatch, navigation)} />
    </View>
  );
};
