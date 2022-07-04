import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { ButtonGroup } from "@rneui/themed";
import Slider from '@react-native-community/slider';
import CircleSizeSelector from 'react-native-circle-size-selector'
import VerticalSlider from 'rn-vertical-slider';
// import CircularSlider from 'react-native-circular-slider';

import { Button } from '../components/Button';
import colors from '../constants/colors';
import { suits, bets} from '../constants/game';
import { TricksWonCircle } from '../components/HandResult/TricksWonCircle';
import { addHand, setActiveHand } from '../redux/actions/hands';
import { updateScore } from '../redux/actions/games';
import { FloatingButton } from '../components/FloatingButton';


export function HandResult ({ route, navigation }) { 
    const { hand, game } = route.params;
    const [tricksWon, setTricksWon] = React.useState(0);
    const handleTricksWonCircleChange = (v) => setTricksWon(v-1);
    const dispatch = useDispatch();     

    const getImageSource = () => {
        switch(bets[hand.Bet]) {
            case "SPADES" :
                return require('../../assets/suits/spades.png');
            case "CLUBS" :
                return require('../../assets/suits/clubs.png');
            case "DIAMONDS" :
                return require('../../assets/suits/diamonds.png');
            case "HEARTS" :
                return require('../../assets/suits/hearts.png');
            case "NO_TRUMPS" :
                return require('../../assets/suits/no_trumps.png');
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // paddingHorizontal:5, 
            backgroundColor: colors.background,
            // paddingBottom:30,
            alignItems: 'center',
            padding:0
        },   
        text: {
            fontSize:25,
            fontFamily: 'sans-serif'
        },
        title : {
            fontWeight:'bold'
        }
    })

    const handleNextButtonOnPress = () => {
        const now = new Date();
        hand.WonAmount = tricksWon;

        dispatch(addHand(hand));    
        dispatch(updateScore(game.GameId));    
        dispatch(setActiveHand(0));
    
        navigation.replace('Hands');
    }


    return (
        <View style={styles.container}>  
            <View style={{padding:0, borderWidth:5, flex:1 }}>           
                
            <View style={{padding:0, borderWidth:5, flex:1 }}>
                    {/* <View style={{padding:0, borderWidth:5, flex:1 }}> */}
                    <Text style={[styles.text, styles.title, { flex:2}]}>{hand.BettingTeam === 0 ? game.TeamOne : game.TeamTwo} bet {hand.BetAmount} {suits[hand.Bet]}</Text>
                    {/* </View> */}
                    <Text style={[styles.text, { flex:1}]}>Select total amount won</Text>
                </View>
                <View style={{padding:0, borderWidth:5, flex:1 }}>
                    {/* <View style={{padding:0, borderWidth:5, flex:1 }}> */}
                    <Text style={[styles.text, styles.title, { flex:2}]}>{hand.BettingTeam === 0 ? game.TeamOne : game.TeamTwo} bet {hand.BetAmount} {suits[hand.Bet]}</Text>
                    {/* </View> */}
                    <Text style={[styles.text, { flex:1}]}>Select total amount won</Text>
                </View>
            </View>
            
            <FloatingButton onPress={handleNextButtonOnPress} icon="ios-arrow-forward-circle-sharp" color={colors.primary} />
      </View>
    );
  };
  