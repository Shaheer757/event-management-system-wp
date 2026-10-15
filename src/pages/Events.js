import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../api/ticketmaster';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        const eventList = data._embedded ? data._embedded.events : [];
        setEvents(eventList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Upcoming Events</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {events.map((event) => (
          <div
            key={event.id}
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', width: '250px' }}
          >
            {event.images && event.images[0] && (
              <img
                src={event.images[0].url}
                alt={event.name}
                style={{ width: '100%', borderRadius: '6px' }}
              />
            )}
            <h3>{event.name}</h3>
            <p>{event.dates?.start?.localDate || "Date TBA"}</p>
            <p>
              {event._embedded?.venues?.[0]?.name || "Venue TBA"}
            </p>
            <Link to={`/events/${event.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;