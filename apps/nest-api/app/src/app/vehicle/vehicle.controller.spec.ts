import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { InspectionService } from '../inspection/inspection.service';

describe('VehicleController', () => {
  let controller: VehicleController;
  let vehicleService: VehicleService;
  let inspectionService: InspectionService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            decodeVin: jest.fn(),
            getVehicleHistory: jest.fn(),
            getLinkedEquipment: jest.fn(),
          },
        },
        {
          provide: InspectionService,
          useValue: {
            getCachedData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    vehicleService = module.get<VehicleService>(VehicleService);
    inspectionService = module.get<InspectionService>(InspectionService);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('getVehicleInfo', () => {
    it('should return complete vehicle information', async () => {
      const testVin = '1FUJGLD55GLGS3951';
      const mockVehicleInfo = {
        vehicleIdNumber: testVin,
        make: 'FREIGHTLINER',
        model: 'CASCADIA',
        modelYear: '2016',
        vehicleType: 'TRUCK',
        manufacturer: 'DAIMLER',
        bodyCabType: 'CONVENTIONAL',
        bodyClass: 'Truck-Tractor',
        brakeSystemType: 'Air',
        driveType: '6x4',
        fuelTypePrimary: 'Diesel',
        vehicleDescriptor: 'Class 8',
      };
      const mockCachedInspections = [
        {
          id: '1',
          reportState: 'GA',
          reportNumber: 'GA123',
          level: '1',
          timeWeight: '1',
          placarableHmVehInsp: 'N',
          hmInspection: 'N',
          vehicles: [
            {
              unit: '1',
              vehicleIdNumber: testVin,
              unitType: 'Truck Tractor',
              licenseState: 'GA',
              licenseNumber: '12345',
            },
          ],
          violations: [],
          inspectionDate: '2024-01-01',
          metadata: {},
          status: { key: 'no-violation', value: 'No Violation' },
        },
        {
          id: '2',
          reportState: 'GA',
          reportNumber: 'GA124',
          level: '1',
          timeWeight: '1',
          placarableHmVehInsp: 'N',
          hmInspection: 'N',
          vehicles: [
            {
              unit: '1',
              vehicleIdNumber: 'different-vin',
              unitType: 'Truck Tractor',
              licenseState: 'GA',
              licenseNumber: '67890',
            },
          ],
          violations: [],
          inspectionDate: '2024-01-02',
          metadata: {},
          status: { key: 'no-violation', value: 'No Violation' },
        },
      ];

      jest
        .spyOn(vehicleService, 'decodeVin')
        .mockResolvedValue(mockVehicleInfo);
      jest.spyOn(vehicleService, 'getVehicleHistory').mockResolvedValue();
      jest.spyOn(vehicleService, 'getLinkedEquipment').mockResolvedValue();
      jest
        .spyOn(inspectionService, 'getCachedData')
        .mockReturnValue(mockCachedInspections);

      const result = await controller.getVehicleInfo(testVin);

      expect(result).toEqual({
        vehicleInfo: mockVehicleInfo,
        history: undefined,
        linkedEquipment: undefined,
        linkedInspections: [mockCachedInspections[0]],
      });

      expect(vehicleService.decodeVin).toHaveBeenCalledWith(testVin);
      expect(vehicleService.getVehicleHistory).toHaveBeenCalledWith(testVin);
      expect(vehicleService.getLinkedEquipment).toHaveBeenCalledWith(testVin);
      expect(inspectionService.getCachedData).toHaveBeenCalled();
    });

    it('should handle null vehicle info', async () => {
      const testVin = 'INVALID_VIN';

      jest.spyOn(vehicleService, 'decodeVin').mockResolvedValue(null);
      jest.spyOn(vehicleService, 'getVehicleHistory').mockResolvedValue();
      jest.spyOn(vehicleService, 'getLinkedEquipment').mockResolvedValue();
      jest.spyOn(inspectionService, 'getCachedData').mockReturnValue([]);

      const result = await controller.getVehicleInfo(testVin);

      expect(result).toEqual({
        vehicleInfo: null,
        history: undefined,
        linkedEquipment: undefined,
        linkedInspections: [],
      });
    });
  });
});
