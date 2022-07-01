import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button } from '../components/Button';
import { addHand } from '../redux/actions/hands';
import colors from '../constants/colors';
import { suits, bets} from '../constants/game';


export function NewHand () { 
    const [team, setTeam] = React.useState('');  
    const [numberOfTricks, setNumberOfTricks] = React.useState(6);
    const [suit, setSuit] = React.useState('');
    const [nextButtonDisabled, setNextButtonDisabled] = React.useState(true);
    const [showNextButtonTooltip, setShowNextButtonTooltip] = React.useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const getCurrentGame = (CurrentGameId, Games) => {
        const game =  Games.find(x => x.GameId === CurrentGameId);
        return game;
    }

    const game = getCurrentGame(useSelector(state => state.CurrentGameId), useSelector(state => state.Games) );

    const handleNumberOfTricksSlider = (value) => {
        setNumberOfTricks(value)
    }

    const handleOnNextButtonOnPressIn = () => {
        console.log('handleOnNextButtonOnPressIn')
        setShowNextButtonTooltip(true);
    }
    
    const handleOnNextButtonOnPressOut = () => {
        console.log('handleOnNextButtonOnPressOut')
        setShowNextButtonTooltip(false);
    }
    
    const handleNextButtonOnPress = () => {
        console.log('handleNextButtonOnPress')
        const now = new Date();
        const newHand = {
            DateEntered: now.toISOString(),
            BettingTeam: team === game.TeamOne ? 1 : 0,
            Bet: bets[suit],
            BetAmount: numberOfTricks,
            WonAmount: -1
        }
    
        navigation.navigate('HandResult', {
            game: game,
            hand: newHand,
          });
    }

    useEffect(() => {
        const isDisabled = team == '' || suit == '';
        setNextButtonDisabled(isDisabled);        
    }, [team, suit]);

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal:5,
            backgroundColor: colors.backgroundColor,
            flexDirection: "column"
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
            <View style={styles.sectionContainer}>
                <Text style={styles.headerText}>Who won the bet?</Text>
                <View style={styles.teamSelectorButtonContainer} >
                    <Button containerStylesOverride={styles.teamSelectedButton} type={team === game.TeamOne && "outline"} onPress={() => setTeam(game.TeamOne)}>{game.TeamOne}</Button>
                    <Button containerStylesOverride={styles.teamSelectedButton} type={team === game.TeamTwo && "outline"} onPress={() => setTeam(game.TeamTwo)}>{game.TeamTwo}</Button>
                </View>
            </View>
            <View style={styles.sectionContainer} >
                <Text style={styles.headerText}>Select the suit</Text>
                <View style={styles.suitPickerImageContainer} >
                    {suits.map((suit) => (
                        <TouchableOpacity onPress={() => setSuit(suit)} key ={suit}  style={styles.circle} >
                            <Image style={styles.suitImageStyle} source={getImageSource(suit)} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.sectionContainer} >
                <Text style={styles.headerText}>Select how many tricks</Text>
                <Slider
                    style={{width: "90%"}}
                    minimumValue={6}
                    maximumValue={10}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={handleNumberOfTricksSlider}
                    step={1}
                    thumbTintColor = {colors.primary}
                    />
                <Text style={styles.headerText}>{numberOfTricks}</Text>
                
            </View>
            <View style={[styles.sectionContainer, styles.bottomButtons]} >
                <TouchableOpacity disabled={nextButtonDisabled} onPressIn={handleOnNextButtonOnPressIn} onPressOut={handleOnNextButtonOnPressOut} onPress={handleNextButtonOnPress}> 
                    <Ionicons name={'arrow-forward-circle'} 
                                color={nextButtonDisabled ? colors.gray : colors.primary} 
                                size={65}
                                style={{paddingLeft:10}}                            
                    />
                </TouchableOpacity>
                <Ionicons name={'md-stats-chart'} 
                            color={colors.primary} 
                            size={65}
                />
            </View>
      </View>
    );
  };
  