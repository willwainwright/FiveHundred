import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import { addHand } from '../redux/actions/hands';
import { Button } from '../components/Button';
import colors from '../constants/colors';


export function NewHand () { 
    const [teamOption, setTeamOption] = React.useState('');  
    const [numberOfTricks, setNumberOfTricks] = React.useState(0);
    const handleChange = (v) => setNumberOfTricks((v / 10).toFixed(0));

    const getCurrentGame = (CurrentGameId, Games) => {
        const game =  Games.find(x => x.GameId === CurrentGameId);
        return game;
    }

    const game = getCurrentGame(useSelector(state => state.CurrentGameId), useSelector(state => state.Games) );

    const handleOnPress = (team) => {
        setTeamOption(team);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: colors.backgroundColor,
        },        
        teamSelectorContainer: {
            flexDirection: "column", 
            minHeight:110,
            backgroundColor:"red",
            
        },
        teamSelectorHeaderText: {
            fontSize: 28,
            fontWeight: '500',
            textAlign: "center"
        },
        teamSelectorButtonContainer : {
           flex:1,
           flexDirection: "row",
           flexWrap: "wrap",
           alignSelf: "center"

        },
        teamSelectedButton :  {
            borderRadius: 50,
            alignSelf: "flex-start",
            marginHorizontal: "1%",
            minWidth: "48%",
            textAlign: "center",
        },
        CirclePickerContainer: {
            flex:1,
            justifyContent: 'center',
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.teamSelectorContainer}>
                <Text style={styles.teamSelectorHeaderText}>Bidding team</Text>
                <View style={styles.teamSelectorButtonContainer} >
                    <Button containerStylesOverride={styles.teamSelectedButton} type={teamOption === "Team1" && "outline"} onPress={() => handleOnPress("Team1")}> Team 1</Button>
                    <Button containerStylesOverride={styles.teamSelectedButton} type={teamOption === "Team2" && "outline"} onPress={() => handleOnPress("Team2")}> Team 2</Button>
                </View>
            </View>
            <View style={styles.CirclePickerContainer} >
            </View>
      </View>
    );
  };
  