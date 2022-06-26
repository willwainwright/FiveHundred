import { View, StyleSheet, Text, Image } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }, 
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
  },
  newGameArrowStyle: {
    position: 'absolute',
    width:150,
    height:150,
    resizeMode: 'contain',
    right: 90,
    bottom: 20,
  }
  });

export const EmptyGamesList = () => {
    return (
      <View style={styles.container}>
          <Text style={styles.emptyListStyle}>
            Tap the + button to create a new game
          </Text>
        <Image style={styles.newGameArrowStyle} source={require('../../../assets/arrow.png')} />
      </View>
      )
}