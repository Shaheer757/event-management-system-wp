import { createSlice } from '@reduxjs/toolkit';

const storedRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];

const initialState = {
  registrations: storedRegistrations,
};

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    registerForEvent: (state, action) => {
      const { userEmail, event } = action.payload;

      const alreadyRegistered = state.registrations.some(
        (r) => r.userEmail === userEmail && r.event.id === event.id
      );

      if (!alreadyRegistered) {
        state.registrations.push({ userEmail, event });
        localStorage.setItem('registrations', JSON.stringify(state.registrations));
      }
    },
    cancelRegistration: (state, action) => {
      const { userEmail, eventId } = action.payload;

      state.registrations = state.registrations.filter(
        (r) => !(r.userEmail === userEmail && r.event.id === eventId)
      );
      localStorage.setItem('registrations', JSON.stringify(state.registrations));
    },
  },
});

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions;
export default registrationsSlice.reducer;