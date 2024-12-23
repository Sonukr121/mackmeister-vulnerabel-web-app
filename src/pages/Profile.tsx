import React, { useState } from 'react';
import { useChallenge } from '../hooks/useChallenge';

const Profile: React.FC = () => {
  const { input: bio, handleInput: handleBio } = useChallenge(6);
  const { input: csrfToken, handleInput: handleCsrfToken } = useChallenge(12);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com'
  });

  const displayBio = () => {
    return { __html: bio };
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Bio (HTML enabled)</label>
        <textarea
          value={bio}
          onChange={(e) => handleBio(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <div dangerouslySetInnerHTML={displayBio()} />
      </div>

      <div className="mt-6">
        <h2 className="text-xl mb-4">Update Profile</h2>
        <input
          type="hidden"
          value={csrfToken}
          onChange={(e) => handleCsrfToken(e.target.value)}
        />
        <button
          onClick={() => setProfileData({ ...profileData })}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;