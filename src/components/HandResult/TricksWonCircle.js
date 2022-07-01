
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import CircularPicker from 'react-native-circular-picker';

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 62,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center"
    }
});

export const TricksWonCircle = (props) => {
    const {tricksTarget, handleChange, children} = props;

    return (
        <CircularPicker
                size={350}
                steps={[tricksTarget * 10]}
                gradients={{
                    0: ['rgb(255, 97, 99)', 'rgb(247, 129, 119)'],
                    [tricksTarget *10]: ['rgb(75, 202, 129)', 'rgb(75, 202, 129)'] 
                }}
                onChange={handleChange} > 
            <Text style={styles.text}>{children}</Text>
        </CircularPicker>
    );
}