import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { cancelRegistration } from '../redux/slices/registrationsSlice';

function MyEvents() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const registrations = useSelector((state) => state.registrations.registrations);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const myRegistrations = registrations.filter((r) => r.userEmail === user.email);

  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  const upcoming = myRegistrations.filter((r) => r.event.date >= today);
  const completed = myRegistrations.filter((r) => r.event.date < today);

  function handleCancel(eventId) {
    dispatch(cancelRegistration({ userEmail: user.email, eventId }));
  }

  function renderEventCard(r) {
    return (
      <div
        key={r.event.id}
        style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', width: '250px' }}
      >
        {r.event.image && (
          <img src={r.event.image} alt={r.event.name} style={{ width: '100%', borderRadius: '6px' }} />
        )}
        <h4>{r.event.name}</h4>
        <p>{r.event.date || "Date TBA"}</p>
        <p>{r.event.venue || "Venue TBA"}</p>
        <Link to={`/events/${r.event.id}`}>View Details</Link>
        <br />
        <button onClick={() => handleCancel(r.event.id)}>Cancel Registration</button>
      </div>
    );
  }

  return (
    <div>
      <h2>My Events</h2>

      <h3>Upcoming Events</h3>
      {upcoming.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {upcoming.map(renderEventCard)}
        </div>
      )}

      <h3>Completed Events</h3>
      {completed.length === 0 ? (
        <p>No completed events.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {completed.map(renderEventCard)}
        </div>
      )}
    </div>
  );
}

export default MyEvents;