import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { NewGameFormValidation } from './NewGameFormValidation';
import { Button } from 'components/Button';
import { TextInput } from 'components/Form';
import { addGame } from 'redux/gamesSlice';
import colors from 'constants/colors';

export function NewGame(props) {
  const { submit, errors, teamOne, setTeamOne, teamTwo, setTeamTwo } = NewGameFormValidation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      padding: 10,
    },
  });

  const onSuccess = (teamOne, teamTwo) => {
    const now = new Date();
    const newGame = {
      DateStarted: now.toISOString(),
      TeamOne: teamOne,
      TeamTwo: teamTwo,
      ScoreOne: 0,
      ScoreTwo: 0,
      Winner: 0,
    };
    dispatch(addGame(newGame));
    navigation.navigate('Hands');
  };

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
      <TextInput label="Team Two" placeholder="Enter name for team two?" value={teamTwo} onChangeText={text => setTeamTwo(text)} errorText={errors.teamTwo} />
      <Button onPress={() => submit(onSuccess)}>Next</Button>
    </View>
  );
}
