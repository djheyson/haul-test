import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VehicleSection } from './VehicleSection';

describe('VehicleSection ', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <VehicleSection
        vehicles={[
          {
            unit: '1',
            vehicleIdNumber: '3HSDZAPR9RN585299',
            unitType: 'Truck Tractor',
            licenseState: 'IN',
            licenseNumber: '3477891',
          },
          {
            unit: '2',
            vehicleIdNumber: '1JJV532D3RL472351',
            unitType: 'Semi-Trailer',
            licenseState: 'IN',
            licenseNumber: 'PD31869',
          },
        ]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
