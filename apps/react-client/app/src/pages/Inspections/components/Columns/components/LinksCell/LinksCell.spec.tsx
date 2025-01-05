import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LinksCell } from './LinksCell';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { BrowserRouter } from 'react-router-dom';

describe('LinksCell', () => {
  it('should render successfully', () => {
    const mockParams: Partial<GridRenderCellParams> = {
      row: {
        id: 1,
        reportNumber: 'ABC123',
        vehicles: [
          { unitType: 'Driver', vehicleIdNumber: 'DRV123' },
          { unitType: 'Truck', vehicleIdNumber: 'TRK456' },
          { unitType: 'Trailer', vehicleIdNumber: 'TRL789' },
        ],
      },
    };

    const { baseElement } = render(
      <BrowserRouter>
        <LinksCell {...(mockParams as GridRenderCellParams)} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
