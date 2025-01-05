import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VehicleInfoContent } from './VehicleInfoContent';

describe('VehicleInfoContent ', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <VehicleInfoContent
        vehicleIdNumber="3HSDZAPR9RN585299"
        make="Ford"
        model="F-150"
        modelYear="2023"
        vehicleType="Truck Tractor"
        manufacturer="Ford"
        bodyCabType="Regular Cab"
        bodyClass="Regular Cab"
        brakeSystemType="Regular Cab"
        driveType="Regular Cab"
        fuelTypePrimary="Regular Cab"
        vehicleDescriptor="Regular Cab"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
