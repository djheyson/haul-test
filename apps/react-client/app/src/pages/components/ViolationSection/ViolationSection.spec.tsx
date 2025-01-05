import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ViolationSection } from './ViolationSection';

describe('ViolationSection ', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ViolationSection
        violations={[
          {
            code: '392.2PK',
            description:
              'Unlawfully parking and/or leaving vehicle in the roadway',
            oos: 'N',
            timeSeverityWeight: '1',
            basic: 'Unsafe Driving',
            unit: 'D',
            convictedOfDifferentCharge: 'N',
          },
          {
            code: '395.8(e)',
            description: 'False report of drivers record of duty status',
            oos: 'N',
            timeSeverityWeight: '7',
            basic: 'HOS Compliance',
            unit: 'D',
            convictedOfDifferentCharge: 'N',
          },
          {
            code: '395.30B1',
            description:
              'Driver failed to certify the accuracy of the information gathered by the ELD',
            oos: 'N',
            timeSeverityWeight: '1',
            basic: 'HOS Compliance',
            unit: 'D',
            convictedOfDifferentCharge: 'N',
          },
          {
            code: '392.3',
            description: 'Operating a CMV while ill or fatigued',
            oos: 'Y',
            timeSeverityWeight: '12',
            basic: 'HOS Compliance',
            unit: 'D',
            convictedOfDifferentCharge: 'N',
          },
        ]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
