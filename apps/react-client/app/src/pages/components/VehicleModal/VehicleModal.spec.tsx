import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VehicleModal } from './VehicleModal';

describe('VehicleModal ', () => {
  it('should render successfully', () => {
    const onClose = vi.fn();
    const { baseElement } = render(
      <VehicleModal vehicleIdNumber="3HSDZAPR9RN585299" onClose={onClose} />
    );
    expect(baseElement).toBeTruthy();
  });
});
