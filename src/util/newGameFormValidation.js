import React from 'react';
import { Alert } from 'react-native';

export const newGameFormValidation = () => {
  const [teamOne, setTeamOne] = React.useState('');
  const [teamTwo, setTeamTwo] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const submit = (onSuccess, navigation, dispatch) => {
    const nextErrors = {};
    if (teamOne.length === 0) {
      nextErrors.teamOne = 'Enter name for team one.';
    }

    if (teamOne.length > 20) {
      nextErrors.teamOne = 'Max length of team name is 20.';
    }

    if (teamTwo.length === 0) {
      nextErrors.teamTwo = 'Enter name for team one.';
    }

    if (teamTwo.length > 20) {
      nextErrors.teamOne = 'Max length of team name is 20.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }

    return onSuccess(navigation, dispatch, teamOne, teamTwo);
  };

  return {
    submit, errors, teamOne, setTeamOne, teamTwo, setTeamTwo
  };
};
