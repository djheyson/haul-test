import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { About } from './About';
import { BrowserRouter } from 'react-router-dom';

describe('About', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
