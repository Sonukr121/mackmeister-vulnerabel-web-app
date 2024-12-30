import React from 'react';
import { useChallenge } from '../hooks/useChallenge';

const Login: React.FC = () => {
  const { input: username, handleInput: handleUsername } = useChallenge(2);
  const { input: password, handleInput: handlePassword } = useChallenge(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`);
    alert('Login functionality is simulated!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;