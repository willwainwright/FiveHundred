import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { ButtonGroup } from "@rneui/themed";
import Slider from '@react-native-community/slider';
import CircleSizeSelector from 'react-native-circle-size-selector'
import VerticalSlider from 'rn-vertical-slider';

import { Button } from '../components/Button';
import colors from '../constants/colors';
import { suits, bets} from '../constants/game';
import { TricksWonCircle } from '../components/HandResult/TricksWonCircle';
import { addHand, setActiveHand } from '../redux/actions/hands';
import { updateScore } from '../redux/actions/games';
import { FloatingButton } from '../components/FloatingButton';


export function HandResultAlt ({ route, navigation }) { 
    const { hand, game } = route.params;

    const [tricksWon, setTricksWon] = React.useState(0);
    const handleTricksWonCircleChange = (v) => setTricksWon(v-1);
    const dispatch = useDispatch()
    
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
       },
        buttonGroupContainer: {
            borderRadius: 10,
            marginBottom:20,
        },
        buttonGroupSelected: {
            backgroundColor: colors.primary
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

    const [tricksViewOptions, setTricksViewOptions] = useState(0)

    const handleTricksViewButtonGroup = (value) => {
        setTricksViewOptions(value)
    }

    const returnCircleSizeSelector = () => {
        return (
            <CircleSizeSelector
            minValue={1}
            maxValue={11}
            initialValue={1}
            onChange={handleTricksWonCircleChange}
            style={{justifyContent:'center', alignItems: 'center'}}
            >
                <Text style={[styles.title, {color:colors.black, alignSelf:'center', justifyContent:'center'}]}>{tricksWon}</Text>
            </CircleSizeSelector>
        )
    }
    
    const returnOriginalCircleSelector = () => {
        return (
            <TricksWonCircle tricksTarget={hand.BetAmount} handleChange={handleTricksWonCircleChange} >
                <Text style={styles.text}>{tricksWon}</Text>
            </TricksWonCircle>
        )
    }

    const returnVerticalOption = () =>{
        return(
            <View style ={{flex:1, justifyContent:"flex-start", width:'90%', flexDirection:"row", paddingLeft:40, borderWidth:3, borderRadius:5  }} >
                <VerticalSlider
                    value={tricksWon}
                    disabled={false}
                    min={0}
                    max={10}
                    onChange={(value) => {
                        setTricksWon(value)
                    }}
                    onComplete={(value) => {
                        setTricksWon(value);
                    }}
                    width={30}
                    height={300}
                    step={1}
                    borderRadius={2}
                    minimumTrackTintColor={'white'}
                    maximumTrackTintColor={'gray'}
                    showBallIndicator
                    ballIndicatorColor={'gray'}
                    ballIndicatorTextColor={'white'}
                    ballIndicatorPosition={50}
                />
                <Text style={[styles.title, {color:colors.white, paddingLeft: 10}]}>{tricksWon}</Text>
            </View>
        )
    }

    const getTricksViewStyle = () => {
        switch (tricksViewOptions) {
            case 0: 
                return returnOriginalCircleSelector();
            case 1: 
                return returnCircleSizeSelector();
            case 2: 
                return returnVerticalOption();
        }        
    }

    return (
        <View style={styles.container}>            
            <ButtonGroup
                    buttons={['v1','v2','v3']}
                    selectedIndex={tricksViewOptions}
                    onPress={handleTricksViewButtonGroup}
                    containerStyle={styles.buttonGroupContainer}
                    selectedButtonStyle={styles.buttonGroupSelected}
                    />

            <View style={styles.textContainer}>
                <Text style={styles.title}>How many tricks were won?</Text>
            </View>
            {getTricksViewStyle()}
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
  