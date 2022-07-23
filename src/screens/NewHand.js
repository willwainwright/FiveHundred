import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { ButtonGroup } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../constants/colors';
import { calculateHandScore } from '../util/scoreCalculator';
import { addHand } from '../redux/gamesSlice';

export function NewHand() {
  const [team, setTeam] = useState(-1);
  const [numberOfTricksBet, setNumberOfTricksBet] = useState(6);
  const [numberOfTricksWon, setNumberOfTricksWon] = useState(0);
  const [suit, setSuit] = useState(-1);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [showNextButtonTooltip, setShowNextButtonTooltip] = useState(false);
  const [showScoreChange, setShowScoreChange] = useState(false);
  const [teamSelectorIndex, setTeamSelectorIndex] = useState(-1);
  const [suitSelectorIndex, setSuitSelectorIndex] = useState(-1);
  const [teamOneScoreChange, setTeamOneScoreChange] = useState(-1);
  const [teamTwoScoreChange, setTeamTwoScoreChange] = useState(0);
  const [tricksChanged, setTricksChanged] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const CurrentGameId = useSelector(state => state.games.activeGameId);
  const game = useSelector(state => state.games.gamesList[CurrentGameId]);

  const handlenumberOfTricksWonSlider = value => {
    setTricksChanged(true);
    setNumberOfTricksWon(value);
  };

  const handleOnNextButtonOnPressIn = () => {
    setShowNextButtonTooltip(true);
  };

  const handleOnNextButtonOnPressOut = () => {
    setShowNextButtonTooltip(false);
  };

  const handleNextButtonOnPress = () => {
    const now = new Date();
    const hand = {
      GameId: CurrentGameId,
      DateEntered: now.toISOString(),
      BettingTeam: team,
      Bet: suit,
      BetAmount: numberOfTricksBet + 6,
      WonAmount: numberOfTricksWon,
      TeamOneScore: teamOneScoreChange,
      TeamTwoScore: teamTwoScoreChange,
    };
    dispatch(addHand(hand));
    navigation.replace('Hands');
  };

  useEffect(() => {
    const betPlaced = team != -1 && suit != -1 && tricksChanged != false;

    const { teamOneScoreChange, teamTwoScoreChange } = calculateHandScore(suit, numberOfTricksWon, numberOfTricksBet + 6, team);

    setTeamOneScoreChange(teamOneScoreChange);
    setTeamTwoScoreChange(teamTwoScoreChange);
    setNextButtonDisabled(!betPlaced);
    setShowScoreChange(betPlaced);
  }, [numberOfTricksWon, suit, numberOfTricksBet, team]);

  const getImageSource = suitSelected => {
    switch (suitSelected) {
      case 'SPADES':
        return 1 === suit ? require('../../assets/suits/spades-outline.png') : require('../../assets/suits/spades.png');
      case 'CLUBS':
        return 2 === suit ? require('../../assets/suits/clubs-outline.png') : require('../../assets/suits/clubs.png');
      case 'DIAMONDS':
        return 3 === suit ? require('../../assets/suits/diamonds-outline.png') : require('../../assets/suits/diamonds.png');
      case 'HEARTS':
        return 4 === suit ? require('../../assets/suits/hearts-outline.png') : require('../../assets/suits/hearts.png');
      case 'NO_TRUMPS':
        return 5 === suit ? require('../../assets/suits/no_trumps-outline.png') : require('../../assets/suits/no_trumps.png');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 5,
      backgroundColor: colors.backgroundColor,
      flexDirection: 'column',
    },
    sectionContainer: {
      flex: 1,
      margin: 0,
    },
    titleText: {
      fontSize: 25,
      fontWeight: '700',
      textAlign: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'left',
      marginLeft: 10,
      marginTop: 20,
    },
    circle: {
      flex: 1,
      height: 70,
      margin: 5,
    },
    suitImageStyle: {
      flex: 1,
      height: 40,
      width: 60,
      resizeMode: 'contain',
    },
    bottomButtons: {
      alignItems: 'flex-end',
      paddingRight: 20,
      flexDirection: 'row-reverse',
    },
    buttonGroupSelected: {
      backgroundColor: colors.primary,
    },
    buttonGroupContainer: {
      borderRadius: 10,
      marginBottom: 0,
      height: 40,
    },
    scoreChangeSection: {
      backgroundColor: colors.white,
      width: '85%',
      alignSelf: 'center',
      borderColor: colors.primary,
      borderWidth: 3,
      borderRadius: 5,
      height: 50,
      flexDirection: 'row',
    },
    scoreChangeInner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const cmp_spades = () => <Image source={getImageSource('SPADES')} style={styles.suitImageStyle} />;
  const cmp_clubs = () => <Image source={getImageSource('CLUBS')} style={styles.suitImageStyle} />;
  const cmp_diamonds = () => <Image source={getImageSource('DIAMONDS')} style={styles.suitImageStyle} />;
  const cmp_hearts = () => <Image source={getImageSource('HEARTS')} style={styles.suitImageStyle} />;
  const cmp_notrumps = () => <Image source={getImageSource('NO_TRUMPS')} style={styles.suitImageStyle} />;

  const handleTeamButtonGroup = value => {
    setTeam(value + 1);
    setTeamSelectorIndex(value);
  };
  const handleSuitButtonGroup = value => {
    setSuit(value + 1);
    setSuitSelectorIndex(value);
  };

  const handleNumberOfTricksBetButtonGroup = value => {
    setNumberOfTricksBet(value);
  };

  const getScoreColor = scoreChange => {
    if (scoreChange < 0) {
      return { color: colors.red };
    }
  };

  const getScoreChangeSectionBorder = () => {
    const scoreChange = team === 1 ? teamOneScoreChange : teamTwoScoreChange;
    if (scoreChange < 0) {
      return { borderColor: colors.red };
    }
  };

  const getScoreIndicator = scoreChange => {
    if (scoreChange > 0) {
      return '+';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sectionContainer]}>
        <Text style={[styles.titleText, { marginVertical: 0 }]}>Bet</Text>
        <Text style={[styles.headerText, { marginTop: 0 }]}>Select team</Text>
        <ButtonGroup
          buttons={[game.TeamOne, game.TeamTwo]}
          selectedIndex={teamSelectorIndex}
          onPress={handleTeamButtonGroup}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={styles.buttonGroupSelected}
        />
        <Text style={styles.headerText}>Select winning bet</Text>
        <ButtonGroup
          buttons={['6', '7', '8', '9', '10']}
          selectedIndex={numberOfTricksBet}
          onPress={handleNumberOfTricksBetButtonGroup}
          containerStyle={[styles.buttonGroupContainer]}
          selectedButtonStyle={styles.buttonGroupSelected}
        />
        <ButtonGroup
          buttons={[{ element: cmp_spades }, { element: cmp_clubs }, { element: cmp_diamonds }, { element: cmp_hearts }, { element: cmp_notrumps }]}
          selectedIndex={suitSelectorIndex}
          onPress={handleSuitButtonGroup}
          containerStyle={[styles.buttonGroupContainer]}
          selectedButtonStyle={styles.buttonGroupSelected}
        />
        <ButtonGroup
          buttons={['Misère', 'Open Misère', 'Blind Misère']}
          selectedIndex={numberOfTricksBet}
          onPress={handleNumberOfTricksBetButtonGroup}
          containerStyle={[styles.buttonGroupContainer]}
          selectedButtonStyle={styles.buttonGroupSelected}
        />
        <Text style={[styles.titleText, { marginTop: 5 }]}>Result</Text>
        <Text style={[styles.headerText, { marginTop: 0, marginBottom: 0 }]}>Tricks won</Text>
        <Text style={[styles.headerText, { textAlign: 'center', marginVertical: 0 }]}>{numberOfTricksWon}</Text>
        <Slider
          style={{ width: '85%', alignSelf: 'center' }}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={handlenumberOfTricksWonSlider}
          onPress={handlenumberOfTricksWonSlider}
          step={1}
          thumbTintColor={colors.primary}
          value={numberOfTricksWon}
        />
        <Text style={[styles.headerText, { marginVertical: 20 }]}>Score change</Text>
        {showScoreChange && (
          <>
            <View style={[styles.scoreChangeSection, getScoreChangeSectionBorder()]}>
              <View style={styles.scoreChangeInner}>
                <Text style={[styles.headerText, { textAlign: 'center', marginTop: 0 }, getScoreColor(teamOneScoreChange)]}>
                  {getScoreIndicator(teamOneScoreChange)}
                  {teamOneScoreChange}
                </Text>
              </View>
              <View style={styles.scoreChangeInner}>
                <Text style={[styles.headerText, { textAlign: 'center', marginTop: 0 }, getScoreColor(teamTwoScoreChange)]}>
                  {getScoreIndicator(teamTwoScoreChange)}
                  {teamTwoScoreChange}
                </Text>
              </View>
            </View>
          </>
        )}
        <View style={[styles.sectionContainer, styles.bottomButtons]}>
          <TouchableOpacity disabled={nextButtonDisabled} onPressIn={handleOnNextButtonOnPressIn} onPressOut={handleOnNextButtonOnPressOut} onPress={handleNextButtonOnPress}>
            <Ionicons name="ios-arrow-forward-circle-sharp" color={nextButtonDisabled ? colors.gray : colors.primary} size={60} style={{ paddingLeft: 10 }} />
          </TouchableOpacity>
          {/* <Ionicons name={'md-stats-chart-sharp'} 
                                color={colors.primary} 
                                size={60}
                                style={{borderWidth:1, borderRadius:10, textAlign: 'center'}}
                    /> */}
        </View>
      </View>
    </View>
  );
}
