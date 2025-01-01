import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getInspections: jest.fn(),
            getInspection: jest.fn(),
            loadDataFromUpload: jest.fn(),
            cleanInspectionData: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
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

      jest.spyOn(appService, 'getInspections').mockResolvedValue(mockResponse);

      const result = await appController.getInspections(1, 25, {
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

      jest.spyOn(appService, 'getInspection').mockResolvedValue(mockInspection);

      const result = await appController.getInspection('ABC123');
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
        .spyOn(appService, 'loadDataFromUpload')
        .mockResolvedValue(mockResponse);

      const result = await appController.uploadFile(mockFile);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('cleanInspectionData', () => {
    it('should clean inspection data', async () => {
      const mockResponse = { message: 'Cleaned inspection data' };
      jest
        .spyOn(appService, 'cleanInspectionData')
        .mockResolvedValue(mockResponse);

      const result = await appController.cleanInspectionData();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetchInspections', () => {
    it('should fetch inspections', async () => {
      const mockResponse = { message: 'Loaded 1 inspections' };
      jest
        .spyOn(appService, 'loadDataFromUpload')
        .mockResolvedValue(mockResponse);

      const result = await appController.fetchInspections({
        carrierId: '12345',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
