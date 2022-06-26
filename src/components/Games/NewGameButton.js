
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';

const testGame =  {
  GameId: 1,
  DateStarted: '2022-06-02 15:34',
  DateFinished: '2022-06-02 16:34',
  TeamOne: 'Phoebe',
  TeamTwo: 'Will',
  ScoreOne: 100,
  ScoreTwo: 500,
  Winner: 2
}

const styles = StyleSheet.create({
    touchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 40,
      bottom: 40,
    },
    floatingButtonStyle: {
      width: 65,
      height: 65,
    },
  });

export const NewGameButton = (props) => {
    const {onPress} = props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.touchableOpacityStyle}>
        <Ionicons name={'md-add-circle'} 
                  color={colors.primary} 
                  size={65}
                  style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    )
  }