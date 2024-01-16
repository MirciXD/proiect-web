import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post('http://localhost:1301/api/groups/addGroup', {
        name: groupName,
        userId:1
      });

      if (response.status === 201) {
        console.log('Group created successfully');
        navigate('/home');
      } else {
        console.error('Group creation failed');
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <h1>Create Group</h1>
      <label>
        Group Name:
        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      </label>
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};

export default CreatePage;
