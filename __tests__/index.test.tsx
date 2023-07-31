import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../src/pages/index';

describe('Home', () => {
  it('renders page with Đặt chỗ ', async () => {

    const { getAllByText } = render(<Home />);

    const makeAppointmentText = await waitFor(() => getAllByText('Đặt chỗ '));

    expect(makeAppointmentText.length).toBeGreaterThan(0)
  });
});
