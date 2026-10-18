# Event Management System

A React-based Event Management System built with Redux Toolkit, React Router, and the Ticketmaster Discovery API. Users can register/login, explore and search events, view event details, register for events, and manage their registrations.

## Features

- User registration, login, and logout (simulated frontend authentication)
- Authentication state persisted via Local Storage
- Browse, search, and filter events by keyword and category (via Ticketmaster API)
- View detailed event information (date, time, venue, image, category)
- Register and cancel registration for events
- "My Events" page showing upcoming and completed registered events
- Protected routes (My Events requires login)

## Tech Stack

- React.js
- Redux Toolkit (`configureStore`, `createSlice`, `useSelector`, `useDispatch`)
- React Router (`BrowserRouter`, `Routes`, dynamic routes, `useParams`, `useNavigate`)
- Ticketmaster Discovery API
- Local Storage (for auth and registration persistence)

## Setup Instructions

1. Clone the repository:

git clone https://github.com/Shaheer757/event-management-system-wp.git
cd event-management-system-wp


2. Install dependencies:

npm install


3. Create a `.env` file in the project root and add your Ticketmaster API key:

REACT_APP_TICKETMASTER_API_KEY=your_api_key_here

   You can get a free API key at [developer.ticketmaster.com](https://developer.ticketmaster.com/).

4. Start the development server:

npm start


5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

src/
├── api/ # Ticketmaster API functions
├── pages/ # Route-level page components (Login, Register, Events, etc.)
├── redux/
│ ├── slices/ # Redux Toolkit slices (auth, registrations)
│ └── store.js # Redux store configuration
├── App.js # Routing and navigation
└── index.js # App entry point, Redux Provider setup


## Notes

- This project uses frontend-only simulated authentication — there is no real backend. User accounts are stored in Local Storage, not a database.
- Event registration data is stored as a simplified object (id, name, date, venue, image) rather than the full Ticketmaster API response, to keep Local Storage usage minimal.