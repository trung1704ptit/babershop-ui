import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../src/pages/index';

describe('Home', () => {
  it('renders page with Make Appointment', async () => {

    const { getAllByText } = render(<Home />);

    const makeAppointmentText = await waitFor(() => getAllByText('Make Appointment'));

    expect(makeAppointmentText.length).toBeGreaterThan(0)
  });
});
