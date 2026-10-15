const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export async function fetchEvents() {
  const url = `${BASE_URL}?apikey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await response.json();
  return data;
}