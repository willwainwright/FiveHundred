import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
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

const handsHeaderText = (teamName) => {
return (
    <View style={{flex:99}}>
        <Text style={styles.headerText}>{teamName}</Text>
    </View>
    )
}

export const HandsHeader = (game) => {
    if(!game) return null;

    return (
        <View style={styles.headingContainer}>
            {handsHeaderText(game.TeamOne)}
            <View style={styles.verticleLine}></View>
            {handsHeaderText(game.TeamTwo)}
        </View>
    )
}