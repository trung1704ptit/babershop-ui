import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../src/pages/index';

describe('Home', () => {
  it('renders page with Make Appointment', () => {
    render(<Home />);

    const makeAppointmentText = screen.getAllByText('Make Appointment');

    expect(makeAppointmentText.length).toBeGreaterThan(0)
  });
});
