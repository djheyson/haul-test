import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ReportNumberCell } from './ReportNumberCell';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { BrowserRouter } from 'react-router-dom';

describe('ReportNumberCell', () => {
  it('should render successfully', () => {
    const mockParams: Partial<GridRenderCellParams> = {
      row: { reportNumber: '123456789' },
    };

    const { baseElement } = render(
      <BrowserRouter>
        <ReportNumberCell {...(mockParams as GridRenderCellParams)} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
