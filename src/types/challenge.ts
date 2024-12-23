export interface Challenge {
  id: number;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  completed: boolean;
  hint?: string;
  path: string;
}

export interface ChallengeContextType {
  challenges: Challenge[];
  completeChallenge: (id: number) => void;
  resetProgress: () => void;
  showCongrats: boolean;
  completedChallenge: Challenge | null;
  closeCongrats: () => void;
}