import { useState } from 'react';
import { checkChallenge } from '../utils/challengeUtils';
import { useChallenges } from '../context/ChallengeContext';

export const useChallenge = (challengeId: number) => {
  const [input, setInput] = useState('');
  const { completeChallenge } = useChallenges();

  const handleInput = (value: string) => {
    setInput(value);
    checkChallenge(challengeId, value, completeChallenge);
  };

  return {
    input,
    handleInput
  };
};