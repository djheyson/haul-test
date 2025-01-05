import { Test } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(async () => {
    process.env.VIN_API_URL = 'http://test-api';
    const module = await Test.createTestingModule({
      providers: [VehicleService],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  afterEach(() => {
    delete process.env.VIN_API_URL;
    jest.clearAllMocks();
  });

  describe('decodeVin', () => {
    const mockVinResponse = {
      data: {
        Results: [
          {
            Make: 'FREIGHTLINER',
            Model: 'CASCADIA',
            ModelYear: '2016',
            VehicleType: 'TRUCK',
            Manufacturer: 'DAIMLER TRUCKS NORTH AMERICA',
            BodyCabType: 'CONVENTIONAL',
            BodyClass: 'Truck-Tractor',
            BrakeSystemType: 'Air Brake System',
            DriveType: '6x4',
            FuelTypePrimary: 'Diesel',
            VehicleDescriptor: 'Class 8',
          },
        ],
      },
    };

    it('should decode VIN successfully', async () => {
      const testVin = '1FUJGLD55GLGS3951';
      mockedAxios.get.mockResolvedValueOnce(mockVinResponse);

      const result = await service.decodeVin(testVin);

      expect(result).toEqual({
        vehicleIdNumber: testVin,
        make: 'FREIGHTLINER',
        model: 'CASCADIA',
        modelYear: '2016',
        vehicleType: 'TRUCK',
        manufacturer: 'DAIMLER TRUCKS NORTH AMERICA',
        bodyCabType: 'CONVENTIONAL',
        bodyClass: 'Truck-Tractor',
        brakeSystemType: 'Air Brake System',
        driveType: '6x4',
        fuelTypePrimary: 'Diesel',
        vehicleDescriptor: 'Class 8',
      });
    });

    it('should return null when API call fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await service.decodeVin('INVALID_VIN');
      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });
  });

  describe('getVehicleHistory', () => {
    it('should log vehicle history request', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      await service.getVehicleHistory('TEST_VIN');
      expect(consoleSpy).toHaveBeenCalledWith('getVehicleHistory', 'TEST_VIN');
    });
  });

  describe('getLinkedEquipment', () => {
    it('should log linked equipment request', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      await service.getLinkedEquipment('TEST_VIN');
      expect(consoleSpy).toHaveBeenCalledWith('getLinkedEquipment', 'TEST_VIN');
    });
  });
});
