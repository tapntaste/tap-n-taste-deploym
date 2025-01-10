import { render } from '@testing-library/react';

import TTicket from './t-ticket';

describe('TTicket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TTicket />);
    expect(baseElement).toBeTruthy();
  });
});
