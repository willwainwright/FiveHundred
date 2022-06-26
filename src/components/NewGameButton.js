
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    touchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
    floatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      //backgroundColor:'black'
    },
  });

export const NewGameButton = (props) => {
    const {onPress} = props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.touchableOpacityStyle}>
        <Image
          //We are making FAB using TouchableOpacity with an image
          //We are using online image here
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
          }}
          //You can use you project image Example below
          //source={require('./images/float-add-icon.png')}
          style={styles.floatingButtonStyle}
      />
      </TouchableOpacity>
    )
  }