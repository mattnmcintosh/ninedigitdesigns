// src/__tests__/About.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../pages/About';

describe('About Component', () => {
  it('renders the page successfully from local data', () => {
    render(<About />);
    expect(screen.getByRole('heading', { level: 3 })).toBeDefined();
  });
});