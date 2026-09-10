import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from '../pages/Contact';

describe('Contact Form Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('submits form data successfully to Netlify background handler', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => 'Success',
    });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/your email/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Interested in commissioning an 11x14 print.' },
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: expect.stringContaining('form-name=contact'),
        })
      );
    });

    const successAlert = await screen.findByText('Thank you! Your message has been sent successfully.');
    expect(successAlert).toBeInTheDocument();
  });
});