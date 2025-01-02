import { Test, TestingModule } from '@nestjs/testing';
import { InspectionController } from './inspection.controller';
import { InspectionService } from './inspection.service';
import axios from 'axios';
jest.mock('axios');

describe('InspectionController', () => {
  let inspectionController: InspectionController;
  let inspectionService: InspectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionController],
      providers: [
        {
          provide: InspectionService,
          useValue: {
            getInspections: jest.fn(),
            getInspection: jest.fn(),
            loadDataFromUpload: jest.fn(),
            cleanInspectionData: jest.fn(),
          },
        },
      ],
    }).compile();

    inspectionController =
      module.get<InspectionController>(InspectionController);
    inspectionService = module.get<InspectionService>(InspectionService);
  });

  describe('getInspections', () => {
    it('should return paginated inspections', async () => {
      const mockResponse = {
        items: [],
        total: 0,
        allBasics: [],
        allStatus: [],
        allAssignedTo: [],
      };

      jest
        .spyOn(inspectionService, 'getInspections')
        .mockResolvedValue(mockResponse);

      const result = await inspectionController.getInspections(1, 25, {
        sort: [{ field: 'inspectionDate', sort: 'desc' }],
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInspection', () => {
    it('should return a single inspection', async () => {
      const mockInspection = {
        id: '123',
        inspectionDate: '2024-01-01',
        reportState: 'CA',
        reportNumber: 'ABC123',
        level: '1',
        timeWeight: '1',
        placarableHmVehInsp: 'N',
        hmInspection: 'N',
        vehicles: [],
        violations: [],
        metadata: {},
        status: { key: 'no-violation', value: 'No Violation' },
      };

      jest
        .spyOn(inspectionService, 'getInspection')
        .mockResolvedValue(mockInspection);

      const result = await inspectionController.getInspection('ABC123');
      expect(result).toEqual(mockInspection);
    });
  });

  describe('uploadFile', () => {
    it('should process uploaded file', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        originalname: 'test.xml',
      } as any;

      const mockResponse = { message: 'Loaded 1 inspections' };
      jest
        .spyOn(inspectionService, 'loadDataFromUpload')
        .mockResolvedValue(mockResponse);

      const result = await inspectionController.uploadFile(mockFile, {
        fileId: '123',
        partNumber: '0',
        totalParts: '1',
        isLastPart: 'true',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('cleanInspectionData', () => {
    it('should clean inspection data', async () => {
      const mockResponse = { message: 'Cleaned inspection data' };
      jest
        .spyOn(inspectionService, 'cleanInspectionData')
        .mockResolvedValue(mockResponse);

      const result = await inspectionController.cleanInspectionData();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetchInspections', () => {
    it('should fetch inspections', async () => {
      const mockXmlResponse = `
        <carrierData>
          <inspections>
            <inspection inspection_date="2024-01-01">
              <vehicles><vehicle></vehicle></vehicles>
              <violations><violation></violation></violations>
            </inspection>
          </inspections>
        </carrierData>
      `;

      (axios.get as jest.Mock).mockResolvedValue({ data: mockXmlResponse });

      const mockResponse = { message: 'Loaded 1 inspections' };
      jest
        .spyOn(inspectionService, 'loadDataFromUpload')
        .mockResolvedValue(mockResponse);

      const result = await inspectionController.fetchInspections({
        carrierId: '12345',
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle fetch errors', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(
        inspectionController.fetchInspections({ carrierId: '12345' })
      ).rejects.toThrow('Failed to fetch inspections');
    });
  });
});
