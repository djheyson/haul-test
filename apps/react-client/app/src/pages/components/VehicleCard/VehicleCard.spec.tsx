import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VehicleCard } from './VehicleCard';

describe('VehicleCard ', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <VehicleCard
        unit="1"
        vehicleIdNumber="3HSDZAPR9RN585299"
        unitType="Truck Tractor"
        licenseState="IN"
        licenseNumber="3477891"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
