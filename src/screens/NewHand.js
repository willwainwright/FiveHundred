import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { addHand } from '../redux/actions/hands';

import { Button } from '../components/Button';
import { TextInput } from '../components/Form';

import colors from '../constants/colors';


export function NewHand () {
    const dispatch = useDispatch();
    const CurrentGameId = useSelector(state => state.CurrentGameId)
    const Game = getCurrentGame(CurrentGameId, useSelector(state => state.Games) );
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundColor,
            padding: 10,
        },
    });

    
    const onSuccess = (teamOne, teamTwo) =>  {
        const newHand = {
            DateStarted: new Date(),
            TeamOne: teamOne,
            TeamTwo: teamTwo,
            ScoreOne: 0,
            ScoreTwo: 0,
            Winner: 0
        }   
        dispatch(addGame(newGame));

        navigation.navigate('Hands');
    }

    return (
        <View style={styles.container}>
            <View style ={styles.teamSelectorContainer}>
                <Button>{Game.TeamOne}</Button>
                <Button>{Game.TeamTwo}</Button>
            </View>
            <TextInput
                label="Enter suit"
                placeholder="Enter name for team one?"
                value={teamOne}
                onChangeText={text => setTeamOne(text)}
                errorText={errors.teamOne}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                label="Team Two"
                placeholder="Enter name for team two?"
                value={teamTwo}
                onChangeText={text => setTeamTwo(text)}
                errorText={errors.teamTwo}
            />
            <Button onPress={() => submit(onSuccess)}>Next</Button>
      </View>
    );
  };
  