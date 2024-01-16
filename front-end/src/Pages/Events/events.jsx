import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Events = () => {
  const { id: groupId } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1301/api/events/getAllEvents?groupId=${groupId}`);
        const data = await response.json();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
      fetchData();
  }, [groupId]);

  return (
    <div>
      <h2>Events for Group {groupId}</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.name} - {event.code}</li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
