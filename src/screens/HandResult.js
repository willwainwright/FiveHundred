import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import Slider from '@react-native-community/slider';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { addHand } from '../redux/actions/hands';
import { Button } from '../components/Button';
import colors from '../constants/colors';
import { suits } from '../constants/game';


export function HandResult () { 
    const [team, setTeam] = React.useState('');  
    const [numberOfTricks, setNumberOfTricks] = React.useState(6);
    const [suit, setSuit] = React.useState('');
    const [nextButtonDisabled, setNextButtonDisabled] = React.useState(true);
    const [showNextButtonTooltip, setShowNextButtonTooltip] = React.useState(false);

    const getCurrentGame = (CurrentGameId, Games) => {
        const game =  Games.find(x => x.GameId === CurrentGameId);
        return game;
    }

    const game = getCurrentGame(useSelector(state => state.CurrentGameId), useSelector(state => state.Games) );

    


    const getImageSource = (suitSelected) => {
        switch(suitSelected) {
            case "SPADES" :
                return suitSelected === suit ? require('../../assets/suits/spades-outline.png') : require('../../assets/suits/spades.png');
            case "CLUBS" :
                return suitSelected === suit ? require('../../assets/suits/clubs-outline.png') : require('../../assets/suits/clubs.png');
            case "DIAMONDS" :
                return suitSelected === suit ? require('../../assets/suits/diamonds-outline.png') : require('../../assets/suits/diamonds.png');
            case "HEARTS" :
                return suitSelected === suit ? require('../../assets/suits/hearts-outline.png') : require('../../assets/suits/hearts.png');
            case "NO_TRUMPS" :
                return suitSelected === suit ? require('../../assets/suits/no_trumps-outline.png') : require('../../assets/suits/no_trumps.png');
            default:
                return suitSelected === suit ? require('../../assets/suits/clubs-outline.png') : require('../../assets/suits/spades.png');
        }
    }
    const getBackgroundColour = () => {
        switch(suit) {
            case "SPADES" :
            case "CLUBS" :
                return suitSelected === suit ? require('../../assets/suits/clubs-outline.png') : require('../../assets/suits/clubs.png');
            case "DIAMONDS" :
            case "HEARTS" :
                return suitSelected === suit ? require('../../assets/suits/hearts-outline.png') : require('../../assets/suits/hearts.png');
            case "NO_TRUMPS" :
                return suitSelected === suit ? require('../../assets/suits/no_trumps-outline.png') : require('../../assets/suits/no_trumps.png');
            default:
                return suitSelected === suit ? require('../../assets/suits/clubs-outline.png') : require('../../assets/suits/spades.png');
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal:5,
            backgroundColor: colors.backgroundColor,
            flexDirection: "column",
            paddingBottom:40
        },        
        sectionContainer: {
            flex:1,
            alignItems: 'center',
        },
        headerText: {
            fontSize: 28,
            fontWeight: '500',
            textAlign: "center"
        },
        teamSelectorButtonContainer : {
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
        suitPickerImageContainer: {
            flex:1,
            justifyContent: 'center',
            flexWrap: "wrap",
            flexDirection: "row"
        },
        circle: {
            flex:1,
            height: 70,
            margin:5,      
         },
         suitImageStyle : {             
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'
         },
         bottomButtons: {
            alignItems:'flex-end',
            paddingRight:20,
            flexDirection: "row-reverse",
        },
         
    });


    return (
        <View style={styles.container}>
            
      </View>
    );
  };
  