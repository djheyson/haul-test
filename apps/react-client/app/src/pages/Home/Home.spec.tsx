import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Home } from './Home';
import { BrowserRouter } from 'react-router-dom';

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
