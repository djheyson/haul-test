import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusCell } from './StatusCell';
import { GridRenderCellParams } from '@mui/x-data-grid';

describe('StatusCell', () => {
  it('should render successfully', () => {
    const mockParams: Partial<GridRenderCellParams> = {
      row: { status: { key: 'no-violation', value: 'No Violation' } },
    };

    const { baseElement } = render(
      <StatusCell {...(mockParams as GridRenderCellParams)} />
    );
    expect(baseElement).toBeTruthy();
  });
});
