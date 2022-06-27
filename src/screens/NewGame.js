import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { addGame } from '../redux/actions/games';

import { newGameFormValidation } from '../util/newGameFormValidation';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';

import colors from '../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        padding: 10,
      },
  });

  
const onSuccess = (navigation, dispatch, teamOne, teamTwo) =>  {
    const newGame = {
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

export const NewGame = ({ navigation }) => {
    const { submit, errors, teamOne, setTeamOne, teamTwo, setTeamTwo } = newGameFormValidation();
    const dispatch = useDispatch();
    
    return (
        <View style={styles.container}>
            <TextInput
                label="Team One"
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
            <Button onPress={() => submit(onSuccess, navigation, dispatch)}>Next</Button>
      </View>
    );
  };
  