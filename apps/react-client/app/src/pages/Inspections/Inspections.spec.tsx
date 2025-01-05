import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Inspections } from './Inspections';
import { BrowserRouter } from 'react-router-dom';

describe('Inspections', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Inspections />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
