import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from '../components/Button';
import colors from '../constants/colors';
import { suits, bets} from '../constants/game';
import { TricksWonCircle } from '../components/HandResult/TricksWonCircle';

export function HandResult ({ route, navigation }) { 
    const { hand, game } = route.params;
    console.log(hand);
    
    const [tricksWon, setTricksWon] = React.useState(0);
    const handleTricksWonCircleChange = (v) => setTricksWon((v / 10).toFixed(0));


    
    useEffect(() => {
        console.log(hand.Bet)
        navigation.setOptions({ headerStyle: {
            backgroundColor: getBackgroundColour(),
            
          }, headerTintColor: colors.white })       
    }, []);
    

    const getImageSource = () => {
        switch(hand.Bet) {
            case 1 :
                return require('../../assets/suits/spades-white.png');
            case 2 :
                return require('../../assets/suits/clubs-white.png');
            case 3 :
                return require('../../assets/suits/diamonds-white.png');
            case 4:
                return require('../../assets/suits/hearts-white.png');
            case 5 :
                return require('../../assets/suits/no_trumps.png');
            default:
                return require('../../assets/suits/clubs-white.png');
        }
    }
    const getBackgroundColour = () => {
        switch(hand.Bet) {
            case 1 :
            case 2 :
                return colors.black;
            case 3 :
            case 4 :
                return colors.red;
            case 5 :
                return colors.white;
            default:
                return colors.white;
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal:5,
            backgroundColor: getBackgroundColour(),
            paddingBottom:40,
            justifyContent: "center",
            alignItems: 'center'
        },   
        title: {
            color: "white",
            fontSize: 28,
            fontWeight: '500',
            textAlign: "center",
            marginBottom:25
        },   
        textContainer: {
            width:"50%",
        },
        floatingImage: {
            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            right: 40,
            bottom: 40,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>How many tricks were won?</Text>
            </View>
            <TricksWonCircle tricksTarget={hand.BetAmount} handleChange={handleTricksWonCircleChange} >

                <Text style={styles.text}>{tricksWon}</Text>
            </TricksWonCircle>
            <View style={styles.floatingImage}>
                <Image source={getImageSource()} />
            </View>
      </View>
    );
  };
  