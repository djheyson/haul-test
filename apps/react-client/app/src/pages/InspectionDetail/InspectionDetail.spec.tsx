import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InspectionDetail } from './InspectionDetail';
import { BrowserRouter } from 'react-router-dom';

describe('InspectionDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <InspectionDetail />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
