import { Link } from 'react-router-dom';

function EventCard({ id, name, image, date, venue, onCancel }) {
  return (
    <div style={{backgroundColor: '#FFFFFF', border: '2px solid #ccc', borderRadius: '10px', padding: '10px', width: '260px', display: 'flex', flexDirection: 'column'}}>
      {image && (
        <img src={image} alt={name} style={{ width: '100%', borderRadius: '5px' }} />
      )}
      <h3>{name}</h3>
      <p>{date || "Date TBA"}</p>
      <p>{venue || "Venue TBA"}</p>
      <div style={{border: '2px solid black', backgroundColor: '#A5D6A7', borderRadius: '10px', textAlign: 'center', marginTop: 'auto'}}>
        <Link className='fw-bold text-decoration-none' style={{ color: 'black' }} to={`/events/${id}`}>View Details</Link>
      </div>

      {onCancel && (
        <>
          <br />
          <button onClick={onCancel}>Cancel Registration</button>
        </>
      )}
    </div>
  );
}

export default EventCard;