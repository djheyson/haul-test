import { Test, TestingModule } from '@nestjs/testing';
import { InspectionController } from './inspection.controller';
import {
  InspectionService,
  ResponseGetInspection,
  ResponseGetInspections,
} from './inspection.service';
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
            getInspectionDetails: jest.fn(),
            initializeData: jest.fn(),
          },
        },
      ],
    }).compile();

    inspectionController =
      module.get<InspectionController>(InspectionController);
    inspectionService = module.get<InspectionService>(InspectionService);
  });

  describe('getInspections', () => {
    it('should get inspections with default pagination', async () => {
      const mockResponse: ResponseGetInspections = {
        items: [],
        total: 0,
        allBasics: [],
        allStatus: [],
        allAssignedTo: [],
      };

      jest
        .spyOn(inspectionService, 'getInspections')
        .mockResolvedValueOnce(mockResponse);

      const result = await inspectionController.getInspections();

      expect(inspectionService.getInspections).toHaveBeenCalledWith(
        0,
        100,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get inspections with custom pagination', async () => {
      const mockResponse: ResponseGetInspections = {
        items: [],
        total: 0,
        allBasics: [],
        allStatus: [],
        allAssignedTo: [],
      };

      jest
        .spyOn(inspectionService, 'getInspections')
        .mockResolvedValueOnce(mockResponse);

      const result = await inspectionController.getInspections(2, 50);

      expect(inspectionService.getInspections).toHaveBeenCalledWith(
        2,
        50,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it('should get inspections with filters', async () => {
      const mockFilters = {
        status: 'COMPLETED',
        date: '2023-01-01',
      };

      const mockResponse: ResponseGetInspections = {
        items: [],
        total: 0,
        allBasics: [],
        allStatus: [],
        allAssignedTo: [],
      };

      jest
        .spyOn(inspectionService, 'getInspections')
        .mockResolvedValueOnce(mockResponse);

      const result = await inspectionController.getInspections(
        0,
        100,
        mockFilters
      );

      expect(inspectionService.getInspections).toHaveBeenCalledWith(
        0,
        100,
        mockFilters
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getInspection', () => {
    it('should get a single inspection by report number', async () => {
      const mockResponse: ResponseGetInspection = {
        id: '1',
        inspectionDate: '2023-01-01',
        reportState: 'COMPLETED',
        reportNumber: '12345',
        level: '1',
        timeWeight: '1',
        placarableHmVehInsp: '1',
        hmInspection: '1',
        vehicles: [],
        violations: [],
        metadata: {},
        status: { key: 'COMPLETED', value: 'COMPLETED' },
      };

      jest
        .spyOn(inspectionService, 'getInspection')
        .mockResolvedValueOnce(mockResponse);

      const result = await inspectionController.getInspection('12345');

      expect(inspectionService.getInspection).toHaveBeenCalledWith('12345');
      expect(result).toEqual(mockResponse);
    });

    it('should handle non-existent report number', async () => {
      jest
        .spyOn(inspectionService, 'getInspection')
        .mockRejectedValueOnce(new Error('Inspection not found'));

      await expect(
        inspectionController.getInspection('non-existent')
      ).rejects.toThrow('Inspection not found');
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

    it('should handle invalid part number error', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        originalname: 'test.xml',
      } as any;

      await expect(
        inspectionController.uploadFile(mockFile, {
          fileId: '123',
          partNumber: '3',
          totalParts: '3',
          isLastPart: 'false',
        })
      ).rejects.toThrow('Invalid part number: 3 of 3');
    });

    it('should successfully handle complete file upload', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        originalname: 'test.xml',
      } as any;

      jest
        .spyOn(inspectionService, 'loadDataFromUpload')
        .mockResolvedValueOnce({ success: true } as any);

      await inspectionController.uploadFile(mockFile, {
        fileId: '123',
        partNumber: '0',
        totalParts: '2',
        isLastPart: 'false',
      });

      const result = await inspectionController.uploadFile(mockFile, {
        fileId: '123',
        partNumber: '1',
        totalParts: '2',
        isLastPart: 'true',
      });

      expect(result).toEqual({ success: true });
    });

    beforeEach(() => {
      jest.clearAllMocks();
      (inspectionController as any).fileChunks = new Map<string, Buffer[]>();
    });

    afterEach(() => {
      jest.clearAllMocks();
      (inspectionController as any).fileChunks.clear();
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

      jest
        .spyOn(inspectionService, 'initializeData')
        .mockResolvedValue(undefined);

      const result = await inspectionController.fetchInspections({
        carrierId: '12345',
      });

      expect(result).toEqual(undefined);
    });

    it('should handle fetch errors', async () => {
      jest
        .spyOn(inspectionService, 'initializeData')
        .mockRejectedValue(new Error('Network error'));

      await expect(
        inspectionController.fetchInspections({ carrierId: '12345' })
      ).rejects.toThrow('Network error');
    });
  });
});
