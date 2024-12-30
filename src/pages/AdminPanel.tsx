import React, { useState } from 'react';
import { useChallenge } from '../hooks/useChallenge';
import { users } from '../data/users';

const AdminPanel: React.FC = () => {
  const { input: command, handleInput: handleCommand } = useChallenge(1);
  const { input: userId, handleInput: handleUserId } = useChallenge(4);
  const { input: debugMode, handleInput: handleDebugMode } = useChallenge(8);
  const { input: configFile, handleInput: handleConfigFile } = useChallenge(14);
  const { input: filePath, handleInput: handleFilePath } = useChallenge(11);

  const [output, setOutput] = useState('');

  const executeCommand = () => {
    setOutput(`Executing command: ${command}`);
  };

  const getUserDetails = (id: string) => {
    const user = users.find(u => u.id === parseInt(id));
    return JSON.stringify(user);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      
      <div className="mb-8">
        <h2 className="text-xl mb-4">System Command</h2>
        <input
          type="text"
          value={command}
          onChange={(e) => handleCommand(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter system command"
        />
        <button
          onClick={executeCommand}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
        >
          Execute
        </button>
        <pre className="mt-4 p-4 bg-gray-100 rounded">{output}</pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-4">User Management</h2>
        <input
          type="text"
          placeholder="Enter user ID"
          value={userId}
          onChange={(e) => handleUserId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {getUserDetails(userId)}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-4">Debug Mode</h2>
        <input
          type="text"
          value={debugMode}
          onChange={(e) => handleDebugMode(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter debug parameters"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-4">Configuration Files</h2>
        <input
          type="text"
          value={configFile}
          onChange={(e) => handleConfigFile(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter config file path"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-4">File Browser</h2>
        <input
          type="text"
          value={filePath}
          onChange={(e) => handleFilePath(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter file path"
        />
      </div>
    </div>
  );
};

export default AdminPanel;