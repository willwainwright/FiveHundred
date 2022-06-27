import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import colors from '../constants/colors';
import { suits, bets, baseScore } from '../constants/game';
import { HandListItem } from '../components/Hands/HandListItem';
import { ListSeparator } from '../components/ListItem';
import { EmptyList } from '../components/EmptyList'
import { FloatingButton } from '../components/FloatingButton';
import { addGame, deleteGame } from '../redux/actions/games';
import { sortBy } from '../util/array';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  columns: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headingContainer: {
    flexDirection: "row", 
    height: 75,
    alignItems: "center"
  },
  headerText: {
    fontSize: 25,
    fontWeight:"bold",
    textAlign: "center"
  } ,
  verticleLine:{
    height: '100%',
    width:1,
    backgroundColor: '#909090',
  }
});

const simpleHand = () =>
{
  return [{
    HandId:0,
    DateEntered: '2022-06-02 15:34',
    BettingTeam: 1,
    Bet: bets.DIAMONDS,
    BetAmount: 7,
    WonAmount: 8,
    TeamOneHandScore: 180,
    TeamTwoHandScore: 20,

  },{
    HandId:1,
    DateEntered: '2022-06-02 15:34',
    BettingTeam: 2,
    Bet: bets.DIAMONDS,
    BetAmount: 6,
    WonAmount: 6,
    TeamOneHandScore: 40,
    TeamTwoHandScore: 80,
  },{
    HandId:2,
    DateEntered: '2022-06-02 15:34',
    BettingTeam: 1,
    Bet: bets.DIAMONDS,
    BetAmount: 8,
    WonAmount: 7,
    TeamOneHandScore: -280,
    TeamTwoHandScore: 30,
  }]
}


const calculateScore = (hands) => {
  console.log(hands);
  if(!hands) return null;
  if(hands.length ===0) return null;

  let teamOneScore =0, teamTwoScore =0;

  // Sort array by handId
  const handsSorted = sortBy(hands, 'HandId')

  // For each object in array
  handsSorted.map(h => {
    teamOneScore += h.TeamOneHandScore;
    teamTwoScore += h.TeamTwoHandScore;
  })

}

const newHandButtonHandler = (hands, dispatch, navigation) => {
    // navigation.navigate('NewGame');
    // dispatch(addGame(simpleGame()));
    calculateScore(hands);
};

const deleteHandHandler = (dispatch, index) => {
  // dispatch(deleteGame(index));
  alert('Delete Hand');
};

const getHands = (currentGameId) =>{
  if(currentGameId ===0) return [];
  return simpleHand();
}

const getCurrentGame = (currentGameId, games) => {  
  const game =  games.find(x => x.GameId === currentGameId);
  return game;
}

const handsHeader = (game) => {

  if(!game) return null;

  return (
    <View style={styles.headingContainer}>
      {handsHeaderText(game.TeamOne)}
      <View style={styles.verticleLine}></View>
      {handsHeaderText(game.TeamTwo)}
    </View>
  )
}

const handsHeaderText = (teamName) => {
  return (
    <View style={{flex:99}}> 
      <Text style={styles.headerText}>{teamName}</Text>
    </View>
  )
}


export const Hands = ({ navigation }) => {
  const currentGameId = useSelector(state => state.currentGameId)
  const games = useSelector(state => state.games)
  const dispatch = useDispatch()
  const game = getCurrentGame(currentGameId, games);

  const hands = getHands(currentGameId);

  return (
    <View style={styles.container}>
      {handsHeader(game)}
        <FlatList
          style={styles.container}
          contentContainerStyle={{ flex: 1 }}
          data={hands}
          ListEmptyComponent={EmptyList("Tap the + button to start a new hand")}
          keyExtractor={item => item.HandId}
          renderItem={({item, index}) => (
            <HandListItem
              hand={item}
              onDelete={() => deleteHandHandler(dispatch, index)}
              onPress={() => alert('Edit hand: ' + item.HandId )}
            />
          )}
          ItemSeparatorComponent={ListSeparator}
          ListHeaderComponent={ListSeparator}
          ListFooterComponent={ListSeparator}
        />
        <FloatingButton onPress={() => newHandButtonHandler(hands, dispatch, navigation)} />
    </View>
  );
};
