import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import * as crypto from 'crypto';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

export interface Vehicle {
  unit: string;
  vehicleIdNumber?: string;
  unitType?: string;
  licenseState?: string;
  licenseNumber?: string;
}

export interface Violation {
  code?: string;
  description?: string;
  oos?: string;
  timeSeverityWeight?: string;
  basic?: string;
  unit?: string;
  convictedOfDifferentCharge: string;
}

export interface InspectionData {
  id: string;
  inspectionDate: string;
  reportState: string;
  reportNumber: string;
  level: string;
  timeWeight: string;
  placarableHmVehInsp: string;
  hmInspection: string;
  vehicles: Vehicle[];
  violations: Violation[];
}

@Injectable()
export class AppService {
  private readonly xmlFilePath =
    'mocks/USDOT_80806_All_BASICs_Public_11-29-2024.xml';
  private cachedData: InspectionData[] = [];

  private transformInspection(rawInspection: any): InspectionData {
    const vehicles = Array.isArray(rawInspection.vehicles?.vehicle)
      ? rawInspection.vehicles.vehicle
      : [rawInspection.vehicles?.vehicle];

    const violations = Array.isArray(rawInspection.violations?.violation)
      ? rawInspection.violations.violation
      : [rawInspection.violations?.violation];

    return {
      id: crypto.randomUUID(),
      inspectionDate: rawInspection.$?.inspection_date,
      reportState: rawInspection.$?.report_state,
      reportNumber: rawInspection.$?.report_number,
      level: rawInspection.$?.level,
      timeWeight: rawInspection.$?.time_weight,
      placarableHmVehInsp: rawInspection.$?.Placarable_HM_Veh_Insp,
      hmInspection: rawInspection.$?.HM_inspection,
      vehicles: vehicles.map((v: any) => ({
        unit: v.$?.unit,
        vehicleIdNumber: v.$?.vehicle_id_number,
        unitType: v.$?.unit_type,
        licenseState: v.$?.license_state,
        licenseNumber: v.$?.license_number,
      })),
      violations: violations.map((v: any) => ({
        code: v.$?.code,
        description: v.$?.description,
        oos: v.$?.oos,
        timeSeverityWeight: v.$?.time_severity_weight,
        basic: v.$?.BASIC,
        unit: v.$?.unit,
        convictedOfDifferentCharge: v.$?.convicted_of_dif_charge,
      })),
    };
  }

  async getData(
    page: number = 0,
    pageSize: number = 100
  ): Promise<PaginatedResponse<InspectionData>> {
    if (this.cachedData.length === 0) {
      const xmlData = fs.readFileSync(this.xmlFilePath, 'utf-8');
      const parser = new xml2js.Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(xmlData);
      const rawData = result.carrierData.inspections.inspection;

      this.cachedData = Array.isArray(rawData)
        ? rawData.map(this.transformInspection)
        : [this.transformInspection(rawData)];
    }

    const start = page * pageSize;
    const end = start + pageSize;

    return {
      items: this.cachedData.slice(start, end),
      total: this.cachedData.length,
    };
  }
}
