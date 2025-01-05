import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VehiclePlateCell } from './VehiclePlateCell';
import { GridRenderCellParams } from '@mui/x-data-grid';

describe('VehiclePlateCell', () => {
  it('should render successfully', () => {
    const mockParams: Partial<GridRenderCellParams> = {
      row: { vehicles: [{ unitType: 'car', licenseNumber: '1234567890' }] },
    };

    const { baseElement } = render(
      <VehiclePlateCell {...(mockParams as GridRenderCellParams)} />
    );
    expect(baseElement).toBeTruthy();
  });
});
