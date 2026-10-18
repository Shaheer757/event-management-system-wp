import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventById } from '../api/ticketmaster';
import { registerForEvent, cancelRegistration } from '../redux/slices/registrationsSlice';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const registrations = useSelector((state) => state.registrations.registrations);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const isRegistered = isAuthenticated && registrations.some(
    (r) => r.userEmail === user.email && r.event.id === event.id
  );

  function handleRegister() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(registerForEvent({
      userEmail: user.email,
      event: {
        id: event.id,
        name: event.name,
        date: event.dates?.start?.localDate,
        venue: event._embedded?.venues?.[0]?.name,
        image: event.images?.[0]?.url,
      },
    }));
  }

  function handleCancel() {
    dispatch(cancelRegistration({ userEmail: user.email, eventId: event.id }));
  }

  return (
    <div className="text-center">
      <div style={{ textAlign: 'left', marginBottom: '80px' }}>
        <Link className="fw-bold" to="/">← Back to Events</Link>
      </div>
      <h2>{event.name}</h2>

      {event.images && event.images[0] && (
        <img src={event.images[0].url} alt={event.name} style={{ maxWidth: '400px' }} />
      )}

      <p><strong>Date:</strong> {event.dates?.start?.localDate || "TBA"}</p>
      <p><strong>Time:</strong> {event.dates?.start?.localTime || "TBA"}</p>
      <p><strong>Venue:</strong> {event._embedded?.venues?.[0]?.name || "TBA"}</p>
      <p><strong>City:</strong> {event._embedded?.venues?.[0]?.city?.name || "TBA"}</p>
      <p><strong>Category:</strong> {event.classifications?.[0]?.segment?.name || "N/A"}</p>

      {isRegistered ? (
        <div>
          <p style={{ color: 'green' }}>You are registered for this event!</p>
          <button style={{backgroundColor: 'red', borderRadius: '10px'}} onClick={handleCancel}>Cancel Registration</button>
        </div>
      ) : (
        <button style={{backgroundColor: '#A5D6A7', borderRadius: '10px'}} onClick={handleRegister}>Register for Event</button>
      )}
    </div>
  );
}

export default EventDetails;