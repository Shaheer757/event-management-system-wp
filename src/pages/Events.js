import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchEvents } from '../api/ticketmaster';
import EventCard from '../components/EventCard';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const { user, isAuthenticated } = useSelector((state) => state.auth);

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
      {isAuthenticated && user && (
       <h4 className="fw-bold mb-5 text-center">Welcome {user.name}!</h4>
      )}
      <h2>Upcoming Events</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="  Search Events"
          value={keyword}
          style={{borderRadius: '10px', borderBlockColor: '#00000', marginRight: '10px'}}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select className='fw-bold' value={category} onChange={(e) => setCategory(e.target.value) }style={{borderRadius: '10px', borderBlockColor: '#00000', marginRight: '10px'}}>
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Arts & Theatre">Arts & Theatre</option>
          <option value="Film">Film</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <button className='fw-bold' type="submit" style={{backgroundColor: '#A5D6A7',borderRadius: '10px', marginRight: '10px'}}>Search</button>
        <button className='fw-bold' type="button" style={{backgroundColor: '#A5D6A7',borderRadius: '10px', marginRight: '10px'}} onClick={handleClear}>Clear</button>
      </form>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: '#D9361E' }}>{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>No events found. Try a different search.</p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', marginTop: '40px'}}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            name={event.name}
            image={event.images?.[0]?.url}
            date={event.dates?.start?.localDate}
            venue={event._embedded?.venues?.[0]?.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Events;