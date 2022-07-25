import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'constants/colors';

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // right: 40,
    bottom: 40,
  },
  floatingButtonStyle: {
    width: 65,
    height: 65,
    shadowColor: 'black',
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 50,
    // iOS
    shadowOffset: {
      width: 0, // These can't both be 0
      height: 1, // i.e. the shadow has to be offset in some way
    },
    // Android
    shadowOffset: {
      width: 0, // Same rules apply from above
      height: 1, // Can't both be 0
    },
  },
});

export const FloatingButton = props => {
  const { onPress, icon = 'md-add-circle', color = colors.primary } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.touchableOpacityStyle}
    >
      <Text
        style={{
          shadowOpacity: 2,
          textShadowRadius: 6,
          width: 65,
          height: 65,
          textShadowOffset: { width: 1, height: 3 },
        }}
      >
        <Ionicons
          name={icon}
          color={color}
          size={65}
          style={[styles.floatingButtonStyle, styles.shadow]}
        />
      </Text>
    </TouchableOpacity>
  );
};
