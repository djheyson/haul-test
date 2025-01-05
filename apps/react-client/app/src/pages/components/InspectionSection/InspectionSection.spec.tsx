import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InspectionSection } from './InspectionSection';

describe('InspectionSection ', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <InspectionSection
        linkedInspections={[
          {
            id: '3570cb37-631f-4d75-96d1-d29a731a1167',
            inspectionDate: '2023-10-20',
            reportState: 'SC',
            reportNumber: 'SCG371000373',
            level: '3',
            timeWeight: '1',
            placarableHmVehInsp: 'No',
            hmInspection: 'No',
            vehicles: [
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
            ],
            violations: [
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
            ],
            metadata: {
              $: {
                inspection_date: '2023-10-20',
                report_state: 'SC',
                report_number: 'SCG371000373',
                level: '3',
                time_weight: '1',
                Placarable_HM_Veh_Insp: 'No',
                HM_inspection: 'No',
              },
              vehicles: {
                vehicle: [
                  {
                    $: {
                      unit: '1',
                      vehicle_id_number: '3HSDZAPR9RN585299',
                      unit_type: 'Truck Tractor',
                      license_state: 'IN',
                      license_number: '3477891',
                    },
                  },
                  {
                    $: {
                      unit: '2',
                      vehicle_id_number: '1JJV532D3RL472351',
                      unit_type: 'Semi-Trailer',
                      license_state: 'IN',
                      license_number: 'PD31869',
                    },
                  },
                ],
              },
              violations: {
                violation: [
                  {
                    $: {
                      code: '392.2PK',
                      description:
                        'Unlawfully parking and/or leaving vehicle in the roadway',
                      oos: 'N',
                      time_severity_weight: '1',
                      BASIC: 'Unsafe Driving',
                      unit: 'D',
                      convicted_of_dif_charge: 'N',
                    },
                  },
                  {
                    $: {
                      code: '395.8(e)',
                      description:
                        'False report of drivers record of duty status',
                      oos: 'N',
                      time_severity_weight: '7',
                      BASIC: 'HOS Compliance',
                      unit: 'D',
                      convicted_of_dif_charge: 'N',
                    },
                  },
                  {
                    $: {
                      code: '395.30B1',
                      description:
                        'Driver failed to certify the accuracy of the information gathered by the ELD',
                      oos: 'N',
                      time_severity_weight: '1',
                      BASIC: 'HOS Compliance',
                      unit: 'D',
                      convicted_of_dif_charge: 'N',
                    },
                  },
                  {
                    $: {
                      code: '392.3',
                      description: 'Operating a CMV while ill or fatigued',
                      oos: 'Y',
                      time_severity_weight: '12',
                      BASIC: 'HOS Compliance',
                      unit: 'D',
                      convicted_of_dif_charge: 'N',
                    },
                  },
                ],
              },
            },
            status: {
              key: 'unresolved',
              value: 'Unresolved',
            },
          },
        ]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
