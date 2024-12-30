import React from 'react';
import { Challenge } from '../types/challenge';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';

interface ChallengeCardProps {
  challenge: Challenge;
}

const difficultyConfig = {
  Easy: { color: 'success', text: 'Easy' },
  Medium: { color: 'warning', text: 'Medium' },
  Hard: { color: 'danger', text: 'Hard' }
} as const;

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const difficulty = difficultyConfig[challenge.difficulty];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{challenge.name}</h3>
          {challenge.completed ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <Circle className="h-6 w-6 text-gray-300" />
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{challenge.description}</p>
        
        <div className="flex items-center justify-between">
          <Badge
            variant={difficulty.color === 'success' ? 'success' : 
                    difficulty.color === 'warning' ? 'warning' : 'danger'}
          >
            {difficulty.text}
          </Badge>
          
          <Link
            to={challenge.path}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            Try Challenge
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;