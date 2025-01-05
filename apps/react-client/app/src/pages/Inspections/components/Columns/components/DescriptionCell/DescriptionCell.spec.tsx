import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DescriptionCell } from './DescriptionCell';
import { GridRenderCellParams } from '@mui/x-data-grid';

describe('DescriptionCell', () => {
  it('should render successfully', () => {
    const mockParams: Partial<GridRenderCellParams> = {
      row: { description: 'Test description' },
      value: 'Test description',
    };

    const { baseElement } = render(
      <DescriptionCell {...(mockParams as GridRenderCellParams)} />
    );
    expect(baseElement).toBeTruthy();
  });
});
