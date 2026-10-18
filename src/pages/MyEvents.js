import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { cancelRegistration } from '../redux/slices/registrationsSlice';
import EventCard from '../components/EventCard';

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
  const today = new Date().toISOString().split('T')[0];
  const upcoming = myRegistrations.filter((r) => r.event.date >= today);
  const completed = myRegistrations.filter((r) => r.event.date < today);

  function handleCancel(eventId) {
    dispatch(cancelRegistration({ userEmail: user.email, eventId }));
  }

  return (
    <div>
      <h2>My Events</h2>

      <h3>Upcoming Events</h3>
      {upcoming.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {upcoming.map((r) => (
            <EventCard
              key={r.event.id}
              id={r.event.id}
              name={r.event.name}
              image={r.event.image}
              date={r.event.date}
              venue={r.event.venue}
              onCancel={() => handleCancel(r.event.id)}
            />
          ))}
        </div>
      )}

      <h3>Completed Events</h3>
      {completed.length === 0 ? (
        <p>No completed events.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {completed.map((r) => (
            <EventCard
              key={r.event.id}
              id={r.event.id}
              name={r.event.name}
              image={r.event.image}
              date={r.event.date}
              venue={r.event.venue}
              onCancel={() => handleCancel(r.event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;