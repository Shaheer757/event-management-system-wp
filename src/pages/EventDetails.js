import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEventById } from '../api/ticketmaster';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEventById(id)
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load event details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div>
      <Link to="/">← Back to Events</Link>
      <h2>{event.name}</h2>

      {event.images && event.images[0] && (
        <img src={event.images[0].url} alt={event.name} style={{ maxWidth: '400px' }} />
      )}

      <p><strong>Date:</strong> {event.dates?.start?.localDate || "TBA"}</p>
      <p><strong>Time:</strong> {event.dates?.start?.localTime || "TBA"}</p>
      <p><strong>Venue:</strong> {event._embedded?.venues?.[0]?.name || "TBA"}</p>
      <p><strong>City:</strong> {event._embedded?.venues?.[0]?.city?.name || "TBA"}</p>
      <p><strong>Category:</strong> {event.classifications?.[0]?.segment?.name || "N/A"}</p>

      <button>Register for Event</button>
    </div>
  );
}

export default EventDetails;