import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonGroup } from "@rneui/themed";

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
    const handleTricksWonCircleChange = (v) => setTricksWon((v / 10).toFixed(0));
    const dispatch = useDispatch()

    // https://github.com/bartgryszko/react-native-circular-slider
    
    useEffect(() => {
        navigation.setOptions({ headerStyle: {
            backgroundColor: getBackgroundColour(),
            
          }, headerTintColor: getActiveColour() })       
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

    const getActiveColour =() => {
        switch(hand.Bet) {
            case 1 :
            case 2 :
                return colors.white;
            case 3 :
            case 4 :
                return colors.white;
            case 5 :
                return colors.black;
            default:
                return colors.black;
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
            color: getActiveColour(),
            fontSize: 28,
            fontWeight: '500',
            textAlign: "center",
            marginBottom:25
        },   
        textContainer: {
            width:"50%",
        },
        floatingImageSuit: {
            position: 'absolute',
            width: 100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            right: 0,
            top: 0
        },
        floatingBetAmount: {
            position: 'absolute',
            // width: 'auto',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            left: 0,
            bottom: 0
        },
        imageStyle :{
            width: 100,
            height: 100,
            resizeMode: 'contain'
        },
        betAmountText :{
            color: getActiveColour(),
            fontSize: 30,
            fontWeight: '500',
            textAlign: "center",
            marginBottom:0,
            paddingLeft:20
        },
        bottomButtons: {
           alignItems:'flex-end',
           paddingRight:20,
           flexDirection: "row-reverse",
       },
       text: {
            color: getActiveColour(),
       }
    });

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
            <View style={styles.textContainer}>
                <Text style={styles.title}>How many tricks were won?</Text>
            </View>
            <TricksWonCircle tricksTarget={hand.BetAmount} handleChange={handleTricksWonCircleChange} >
                <Text style={styles.text}>{tricksWon}</Text>
            </TricksWonCircle>
            <View style={styles.floatingImageSuit}>
                <Image source={getImageSource()} style={styles.imageStyle} />
            </View>
            <View style={styles.floatingBetAmount}>
                <Text style={styles.betAmountText}>Target: {hand.BetAmount}</Text>
            </View>
            {/* <View style={styles.bottomButtons} >
                <TouchableOpacity onPress={handleNextButtonOnPress}> 
                    <Ionicons name='ios-arrow-forward-circle-sharp' 
                                color={colors.primary} 
                                size={60}
                                // style={{paddingLeft:10}}                            
                    />
                </TouchableOpacity>
            </View> */}
            <FloatingButton onPress={handleNextButtonOnPress} icon="ios-arrow-forward-circle-sharp" color={getActiveColour()} />
      </View>
    );
  };
  