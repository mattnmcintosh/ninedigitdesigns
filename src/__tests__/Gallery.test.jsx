import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Gallery from '../pages/Gallery';

vi.stubEnv('VITE_WP_TOKEN', 'fake_token');
vi.stubEnv('VITE_WP_USERNAME', 'fake_user');

describe('Gallery Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders loading state initially and displays artworks upon successful fetch', async () => {
    const mockArtworks = [
      {
        id: 101,
        title: { rendered: 'Sunset Over Lake Erie' },
        source_url: 'https://example.com/image.jpg',
        media_details: { sizes: { medium: { source_url: 'https://example.com/thumb.jpg' } } }
      }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockArtworks,
    });

    render(<Gallery />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    const artTitle = await screen.findByText('Sunset Over Lake Erie');
    expect(artTitle).toBeInTheDocument();
  });

  it('opens lightbox modal when an artwork card is clicked', async () => {
    const mockArtworks = [
      {
        id: 102,
        title: { rendered: 'Abstract Floral' },
        source_url: 'https://example.com/full.jpg',
        media_details: { sizes: { medium: { source_url: 'https://example.com/thumb2.jpg' } } }
      }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockArtworks,
    });

    render(<Gallery />);

    // Target the specific artwork image by its alt text
    const artworkImage = await screen.findByAltText('Abstract Floral');
    fireEvent.click(artworkImage);

    // Verify the modal dialog opens and displays the instruction text
    const modalInstruction = await screen.findByText('Click anywhere outside the image to close.');
    expect(modalInstruction).toBeInTheDocument();
  });
});