import { useEffect, useState } from 'react';
import { fetchEvents } from '../api/ticketmaster';

function Events() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchEvents()
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Events Page</h2>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
}

export default Events;