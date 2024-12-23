import React, { createContext, useState, useContext } from 'react';
import { Challenge, ChallengeContextType } from '../types/challenge';

const initialChallenges: Challenge[] = [
  {
    id: 1,
    name: 'Command Injection',
    description: 'Find a way to execute system commands through the admin panel.',
    difficulty: 'Medium',
    category: 'Injection',
    completed: false,
    hint: 'Try entering system commands in the command input field.',
    path: '/admin'
  },
  {
    id: 2,
    name: 'SQL Injection Login',
    description: 'Bypass the login authentication using SQL injection.',
    difficulty: 'Easy',
    category: 'Injection',
    completed: false,
    hint: 'What happens if you add SQL syntax to the username field?',
    path: '/login'
  },
  {
    id: 3,
    name: 'Stored XSS',
    description: 'Execute JavaScript code through the review system.',
    difficulty: 'Medium',
    category: 'XSS',
    completed: false,
    hint: 'Try adding HTML tags with JavaScript in your review.',
    path: '/reviews'
  },
  {
    id: 4,
    name: 'Insecure Direct Object Reference',
    description: 'Access user data without proper authorization.',
    difficulty: 'Easy',
    category: 'Access Control',
    completed: false,
    hint: 'Try accessing different user IDs in the admin panel.',
    path: '/admin'
  },
  {
    id: 5,
    name: 'Information Disclosure',
    description: 'Find sensitive information in the payment process.',
    difficulty: 'Easy',
    category: 'Security Misconfiguration',
    completed: false,
    hint: 'Check the browser console during checkout.',
    path: '/checkout'
  },
  {
    id: 6,
    name: 'DOM-based XSS',
    description: 'Execute JavaScript through the profile bio field.',
    difficulty: 'Medium',
    category: 'XSS',
    completed: false,
    hint: 'The bio field renders HTML directly to the DOM.',
    path: '/profile'
  },
  {
    id: 7,
    name: 'NoSQL Injection',
    description: 'Manipulate the search query to expose all products.',
    difficulty: 'Hard',
    category: 'Injection',
    completed: false,
    hint: 'Try using NoSQL operators in the search field.',
    path: '/search'
  },
  {
    id: 8,
    name: 'Broken Access Control',
    description: 'Access the admin panel without proper authentication.',
    difficulty: 'Medium',
    category: 'Access Control',
    completed: false,
    hint: 'Check for client-side access controls.',
    path: '/admin'
  },
  {
    id: 9,
    name: 'Sensitive Data Exposure',
    description: 'Find hardcoded credentials in the source code.',
    difficulty: 'Easy',
    category: 'Security Misconfiguration',
    completed: false,
    hint: 'Inspect the network requests and source code.',
    path: '/login'
  },
  {
    id: 10,
    name: 'Broken Authentication',
    description: 'Bypass the authentication mechanism.',
    difficulty: 'Hard',
    category: 'Authentication',
    completed: false,
    hint: 'Look for weaknesses in the session management.',
    path: '/login'
  },
  {
    id: 11,
    name: 'Path Traversal',
    description: 'Access files outside the intended directory.',
    difficulty: 'Hard',
    category: 'File System',
    completed: false,
    hint: 'Try manipulating file paths in requests.',
    path: '/admin'
  },
  {
    id: 12,
    name: 'Cross-Site Request Forgery',
    description: 'Execute unauthorized actions on behalf of authenticated users.',
    difficulty: 'Medium',
    category: 'CSRF',
    completed: false,
    hint: 'Look for missing CSRF tokens in forms.',
    path: '/profile'
  },
  {
    id: 13,
    name: 'Insecure Deserialization',
    description: 'Exploit the cart functionality through object manipulation.',
    difficulty: 'Hard',
    category: 'Deserialization',
    completed: false,
    hint: 'Inspect the cart data structure in localStorage.',
    path: '/checkout'
  },
  {
    id: 14,
    name: 'Security Misconfiguration',
    description: 'Find and exploit misconfigured security settings.',
    difficulty: 'Medium',
    category: 'Security Misconfiguration',
    completed: false,
    hint: 'Check for exposed configuration files.',
    path: '/admin'
  },
  {
    id: 15,
    name: 'Client-Side Validation Bypass',
    description: 'Bypass client-side input validation in the checkout process.',
    difficulty: 'Easy',
    category: 'Input Validation',
    completed: false,
    hint: 'Try manipulating requests directly.',
    path: '/checkout'
  }
];

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [showCongrats, setShowCongrats] = useState(false);
  const [completedChallenge, setCompletedChallenge] = useState<Challenge | null>(null);

  const completeChallenge = (id: number) => {
    const challenge = challenges.find(c => c.id === id);
    if (challenge && !challenge.completed) {
      setChallenges(challenges.map(c => 
        c.id === id ? { ...c, completed: true } : c
      ));
      setCompletedChallenge(challenge);
      setShowCongrats(true);
    }
  };

  const resetProgress = () => {
    setChallenges(initialChallenges);
  };

  const closeCongrats = () => {
    setShowCongrats(false);
    setCompletedChallenge(null);
  };

  return (
    <ChallengeContext.Provider value={{ 
      challenges, 
      completeChallenge, 
      resetProgress,
      showCongrats,
      completedChallenge,
      closeCongrats
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
};