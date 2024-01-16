import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Home.css'


const GroupItem = ({ group }) => {
  return (
    <div className='eventHome'>
      <span>{group.name}</span>
      <Link to={`/events/${group.groupId}`}>
        <button className='btnHome'>View Events</button>
      </Link>
    </div>
  );
};

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [eventCode, setEventCode] = useState('');
  const navigate = useNavigate();
  const [user,setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1301/api/groups/getAllGroups');
        const data = await response.json();
        console.log(data);
        setGroups(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const getUser = async () =>{
      axios.get('http://localhost:1301/api/users/getCurrentUser', {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        }
      })
      .then((res)=>{
        setUser(res.data)
      })
    }

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');

      const response = await fetch('http://localhost:1301/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }

    navigate('/')
  };

  const handleCreateGroup = () => {
    navigate('/createPage');
  };

  const handleAddAttendance = async () => {
    try {
      const response = await fetch(`http://localhost:1301/api/attendance/addAttendance/${eventCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: '1',
          checkInTime: new Date(),
        }),
      });
      console.log(response)
      if (response.ok) {
        console.log('Attendance added successfully');
      } else {
        console.error('Failed to add attendance');
      }
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  };

  return (
    <div className='containerHome'>
      <h1 className='titleHome'>Groups</h1>
      <div className='addAttendanceContainer'>
        <input
          type="text"
          placeholder="Enter event code"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
        />
        <button onClick={handleAddAttendance} className='btnHome'>Add Attendance</button>
      </div>
      {
      user.isAdmin?
      <button onClick={handleCreateGroup} className='btnHome'>Create Group</button>
      :
      <div></div>
      }
      
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
      <button onClick={handleLogout} className='btnHome'>Logout</button>
    </div>
  );
};

export default Home;
