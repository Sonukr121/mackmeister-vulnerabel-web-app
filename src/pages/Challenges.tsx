import React, { useState } from 'react';
import { useChallenges } from '../context/ChallengeContext';
import ChallengeCard from '../components/ChallengeCard';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';

const Challenges: React.FC = () => {
  const { challenges, resetProgress } = useChallenges();
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(challenges.map(c => c.category))];
  
  const filteredChallenges = challenges.filter(challenge => 
    filter === 'all' || challenge.category === filter
  );

  const completedCount = challenges.filter(c => c.completed).length;
  const totalChallenges = challenges.length;
  const progressPercentage = (completedCount / totalChallenges) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Security Challenges</h1>
        <button
          onClick={resetProgress}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Reset Progress
        </button>
      </div>

      <Card className="mb-8">
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium">Progress</span>
            <Badge variant={progressPercentage === 100 ? 'success' : 'default'}>
              {completedCount} / {totalChallenges} completed
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className="bg-purple-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChallengeCard challenge={challenge} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Challenges;