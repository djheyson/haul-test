import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from './app';

// Mock the dependencies
vi.mock('@toolpad/core/react-router-dom', () => ({
  AppProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('../utils', () => ({
  flattenRoutes: () => [{ path: '/', title: 'Home' }],
}));

vi.mock('../main', () => ({
  routes: [],
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
