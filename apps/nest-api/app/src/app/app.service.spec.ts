import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  const mockXmlContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <carrierData>
      <inspections>
        <inspection
          inspection_date="2022-12-31" 
          report_state="GA" 
          report_number="GA1382001266" 
          level="2" 
          time_weight="1" 
          Placarable_HM_Veh_Insp="No" 
          HM_inspection="No">
          <vehicles>
            <vehicle 
              unit="1" 
              vehicle_id_number="1FUJGLD55GLGS3951" 
              unit_type="Truck Tractor" 
              license_state="IN" 
              license_number="3316108">
            </vehicle>
            <vehicle 
              unit="2" 
              vehicle_id_number="1JJV532D6GL927500" 
              unit_type="Semi-Trailer" 
              license_state="OK" 
              license_number="5457KT">
            </vehicle>
          </vehicles>
          <violations>
            <violation 
              code="395.24(d)" 
              description="ELD cannot transfer ELD records electronically" 
              oos="N" 
              time_severity_weight="3" 
              BASIC="HOS Compliance" 
              unit="D" 
              convicted_of_dif_charge="N">
            </violation>
          </violations>
        </inspection>
      </inspections>
    </carrierData>
  `;

  describe('loadDataFromUpload', () => {
    it('should parse XML and transform inspections', async () => {
      const result = await service.loadDataFromUpload(mockXmlContent);
      expect(result).toEqual({ message: 'Loaded 1 inspections' });
    });

    it('should handle invalid XML', async () => {
      const invalidXml = 'invalid xml content';
      await expect(service.loadDataFromUpload(invalidXml)).rejects.toThrow();
    });
  });

  describe('getInspections', () => {
    beforeEach(async () => {
      await service.cleanInspectionData();
      await service.loadDataFromUpload(mockXmlContent);
    });

    it('should return paginated inspections', async () => {
      const result = await service.getInspections(0, 10);
      expect(result?.items).toBeDefined();
      expect(result?.total).toBe(1);
    });

    it('should apply filters', async () => {
      const result = await service.getInspections(0, 10, {
        basic: 'HOS Compliance',
      });
      expect(result?.items.length).toBe(1);
    });

    it('should apply sorting', async () => {
      const result = await service.getInspections(0, 10, {
        sort: [{ field: 'inspectionDate', sort: 'desc' }],
      });
      expect(result?.items[0].inspectionDate).toBe('2022-12-31');
    });

    it('should return null when no data', async () => {
      await service.cleanInspectionData();
      const result = await service.getInspections(0, 10);
      expect(result).toBeNull();
    });
  });

  describe('getInspection', () => {
    beforeEach(async () => {
      await service.loadDataFromUpload(mockXmlContent);
    });

    it('should return single inspection', async () => {
      const result = await service.getInspection('GA1382001266');
      expect(result).toBeDefined();
      expect(result?.reportNumber).toBe('GA1382001266');
    });

    it('should return null for non-existent inspection', async () => {
      const result = await service.getInspection('NONEXISTENT');
      expect(result).toBeNull();
    });
  });

  describe('cleanInspectionData', () => {
    it('should clean all inspection data', async () => {
      await service.loadDataFromUpload(mockXmlContent);
      const result = await service.cleanInspectionData();
      expect(result).toEqual({ message: 'Cleaned inspection data' });
    });
  });

  describe('transformInspection', () => {
    it('should handle empty vehicles and violations', async () => {
      const emptyXml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <carrierData>
          <inspections>
            <inspection inspection_date="2024-01-01" report_number="EMPTY123" report_state="CA" level="1" time_weight="1" Placarable_HM_Veh_Insp="N" HM_inspection="N">
              <vehicles></vehicles>
              <violations></violations>
            </inspection>
          </inspections>
        </carrierData>
      `;

      await service.loadDataFromUpload(emptyXml);
      const result = await service.getInspection('EMPTY123');

      expect(result?.vehicles).toEqual([]);
      expect(result?.violations).toEqual([]);
      expect(result?.status.key).toBe('no-violation');
    });
  });
});
