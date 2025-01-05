import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Toolbar } from './Toolbar';

describe('Toolbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Toolbar />);
    expect(baseElement).toBeTruthy();
  });
});
