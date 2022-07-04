import React, {useEffect} from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import colors from '../constants/colors';
import { bets } from '../constants/game';
import { HandListItem } from '../components/Hands/HandListItem';
import { HandsHeader } from '../components/Hands/HandsHeader';
import { ListSeparator } from '../components/ListItem';
import { EmptyList } from '../components/EmptyList'
import { FloatingButton } from '../components/FloatingButton';
import { addHand, deleteHand } from '../redux/actions/hands';
import { updateScore } from '../redux/actions/games';
import { sortArrayBy } from '../util/array'
import { useNavigation } from '@react-navigation/native';

export const Hands = () => {
  const [completedGame, setCompletedGame] = React.useState(false);
  
  const CurrentGameId = useSelector(state => state.CurrentGameId)
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getCurrentGame = (CurrentGameId, Games) => {
    const game =  Games.find(x => x.GameId === CurrentGameId);
    
    return game;
  }

      
  useEffect(() => {
    if(game?.ScoreOne >=500 || game?.ScoreTwo >= 500) {
      setCompletedGame(true);
    }
  }, []);    

  const calculateRunningScore = (hands) => {
    // Calculate the running score.
    if(hands?.length === 0) return hands;

    let handsWithScore = hands;  
    let teamOneScore = 0, teamTwoScore = 0;

    // Sort array by handId
    const handsSorted = sortArrayBy(hands, 'HandId')

    // For each object in array
    handsSorted.map((h, index) => {
      teamOneScore += h.TeamOneHandScore;
      teamTwoScore += h.TeamTwoHandScore;
      
      handsWithScore[index].RunningTeamOneScore = teamOneScore;
      handsWithScore[index].RunningTeamTwoScore = teamTwoScore;
    })

    return handsWithScore;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    columns: {
      flex: 1,
      backgroundColor: colors.background,
    },
    verticleLine:{
      height: '100%',
      width:1,
      backgroundColor: '#909090',
    },
    fireworks: {
      position:'absolute',
      height:"100%",
      width:"100%",
      left:0,
      top:0
    }
  });

  const newHandButtonHandler = (gameId) => {
    navigation.navigate('NewHand', {game});
  };

  const deleteHandHandler = ( index) => {
    // dispatch(deleteGame(index));
    alert('Delete Hand');
  };
  const game = getCurrentGame(CurrentGameId, useSelector(state => state.Games) );
  const hands = calculateRunningScore(game.Hands);

  return (
    <View style={styles.container}>
      {HandsHeader(game)}
        <FlatList
          style={styles.container}
          contentContainerStyle={{ flex: 1 }}
          data={hands}
          ListEmptyComponent={EmptyList("Tap the + button to start a new hand")}
          keyExtractor={item => item.HandId}
          renderItem={({item, index}) => (
            <HandListItem
              hand={item}
              game={game}
              onDelete={() => deleteHandHandler(index)}
              onPress={() => alert('Edit hand: ' + item.HandId )}
            />
          )}
          ItemSeparatorComponent={ListSeparator}
          ListHeaderComponent={ListSeparator}
          ListFooterComponent={ListSeparator}
        />
        <FloatingButton onPress={() => newHandButtonHandler(CurrentGameId)} />
      {completedGame && <Image source={require('../../assets/fireworks.gif')}  style={styles.fireworks}/>}
    </View>
  );
};
