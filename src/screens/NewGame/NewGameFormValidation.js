import React from 'react';

export const NewGameFormValidation = () => {
  const [teamOne, setTeamOne] = React.useState('');
  const [teamTwo, setTeamTwo] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const submit = (onSuccess) => {

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

    if(teamTwo === teamOne) {
      nextErrors.teamTwo = 'Team names but be different'
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }

    return onSuccess(teamOne, teamTwo);
  };

  return {
    submit, errors, teamOne, setTeamOne, teamTwo, setTeamTwo
  };
};
