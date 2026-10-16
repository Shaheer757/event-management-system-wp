import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../api/ticketmaster';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  function loadEvents(searchKeyword = '', searchCategory = '') {
    setLoading(true);
    setError('');

    fetchEvents({ keyword: searchKeyword, category: searchCategory })
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
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    loadEvents(keyword, category);
  }

  function handleClear() {
    setKeyword('');
    setCategory('');
    loadEvents();
  }

  return (
    <div>
      <h2>Upcoming Events</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Arts & Theatre">Arts & Theatre</option>
          <option value="Film">Film</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>No events found. Try a different search.</p>
      )}

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
            <p>{event._embedded?.venues?.[0]?.name || "Venue TBA"}</p>
            <Link to={`/events/${event.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;