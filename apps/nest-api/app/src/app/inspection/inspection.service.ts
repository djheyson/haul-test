import { Injectable, Logger } from '@nestjs/common';
import * as xml2js from 'xml2js';
import * as crypto from 'crypto';
import { VehicleInfo } from '../vehicle/vehicle.service';
import { VehicleService } from '../vehicle/vehicle.service';
import axios from 'axios';

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
  vehicleInfo?: VehicleInfo;
  linkedInspections?: InspectionData[];
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
  metadata: any;
  status: { key: string; value: string };
}

export interface Filters {
  assignedTo?: string;
  status?: string;
  basic?: string;
  sort?: {
    field: string;
    sort: 'asc' | 'desc';
  }[];
}

export type ResponseGetInspections = {
  items: InspectionData[];
  total: number;
  allBasics: string[];
  allStatus: string[];
  allAssignedTo: string[];
} | null;

export type ResponseGetInspection = InspectionData | null;

@Injectable()
export class InspectionService {
  private cachedData: InspectionData[] = [];

  constructor(private readonly vehicleService: VehicleService) {
    this.initializeData(process.env.DEFAULT_CARRIER_ID);
  }

  getCachedData(): InspectionData[] {
    return this.cachedData;
  }

  async initializeData(carrierId?: string) {
    try {
      if (!carrierId) {
        Logger.warn('No DEFAULT_CARRIER_ID provided in environment variables');
        return;
      }

      const url = `${process.env.FMCS_API_URL}/SMS/Carrier/${carrierId}/Download.aspx?BASIC=0&FileType=XML`;
      Logger.log('Fetching initial inspection data...');
      const response = await axios.get(url);
      await this.loadDataFromUpload(response.data);
      Logger.log('Initial inspection data loaded successfully');
    } catch (error) {
      Logger.error('Failed to fetch initial inspection data:', error);
    }
  }

  async loadDataFromUpload(xmlContent: string): Promise<{ message: string }> {
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlContent);
    const rawData = result.carrierData.inspections.inspection;

    this.cachedData = Array.isArray(rawData)
      ? rawData.map(this.transformInspection)
      : [this.transformInspection(rawData)];

    return { message: `Loaded ${this.cachedData.length} inspections` };
  }

  private transformInspection(rawInspection: any): InspectionData {
    const vehicles = (
      Array.isArray(rawInspection.vehicles?.vehicle)
        ? rawInspection.vehicles.vehicle
        : [rawInspection.vehicles?.vehicle]
    )
      .filter(Boolean)
      .map((v: any) => ({
        unit: v?.$?.unit,
        vehicleIdNumber: v?.$?.vehicle_id_number,
        unitType: v?.$?.unit_type,
        licenseState: v?.$?.license_state,
        licenseNumber: v?.$?.license_number,
      }));

    const violations = (
      Array.isArray(rawInspection.violations?.violation)
        ? rawInspection.violations.violation
        : [rawInspection.violations?.violation]
    )
      .filter(Boolean)
      .map((v: any) => ({
        code: v?.$?.code,
        description: v?.$?.description,
        oos: v?.$?.oos,
        timeSeverityWeight: v?.$?.time_severity_weight,
        basic: v?.$?.BASIC,
        unit: v?.$?.unit,
        convictedOfDifferentCharge: v?.$?.convicted_of_dif_charge,
      }));

    const getStatus = (violations: Violation[]) => {
      if (!violations || violations.length === 0) {
        return { key: 'no-violation', value: 'No Violation' };
      }

      const hasOnlyEmptyViolations = violations.every(
        (v) => !v.code && !v.description && !v.basic
      );

      if (hasOnlyEmptyViolations) {
        return { key: 'no-violation', value: 'No Violation' };
      }

      return { key: 'unresolved', value: 'Unresolved' };
    };

    return {
      id: crypto.randomUUID(),
      inspectionDate: rawInspection.$?.inspection_date,
      reportState: rawInspection.$?.report_state,
      reportNumber: rawInspection.$?.report_number,
      level: rawInspection.$?.level,
      timeWeight: rawInspection.$?.time_weight,
      placarableHmVehInsp: rawInspection.$?.Placarable_HM_Veh_Insp,
      hmInspection: rawInspection.$?.HM_inspection,
      vehicles,
      violations,
      metadata: rawInspection,
      status: getStatus(violations),
    };
  }

  async getInspections(
    page: number = 0,
    pageSize: number = 100,
    filters: Filters = {}
  ): Promise<ResponseGetInspections> {
    const filteredData = this.cachedData.filter((inspection) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        if (key === 'sort') return true;
        if (key === 'basic') {
          return inspection.violations.some(
            (v) => v.basic?.trim() === value?.trim()
          );
        }
        if (key === 'status' && value) {
          return inspection.status.key === value;
        }
        return (
          key in inspection && inspection[key as keyof InspectionData] === value
        );
      });
    });

    if (filters.sort?.length) {
      filteredData.sort((a, b) => {
        for (const { field, sort } of filters?.sort || []) {
          // Handle nested violation fields
          if (field === 'basic' || field === 'description') {
            const aValue = a.violations[0]?.[field] || '';
            const bValue = b.violations[0]?.[field] || '';
            if (aValue !== bValue) {
              return sort === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
            }
            continue;
          }

          const aValue = a[field as keyof InspectionData];
          const bValue = b[field as keyof InspectionData];

          // Handle status object specially
          if (field === 'status') {
            const aStatus = (aValue as { value: string }).value;
            const bStatus = (bValue as { value: string }).value;
            if (aStatus !== bStatus) {
              return sort === 'asc'
                ? aStatus.localeCompare(bStatus)
                : bStatus.localeCompare(aStatus);
            }
          }
          // Handle numbers
          else if (typeof aValue === 'number' && typeof bValue === 'number') {
            if (aValue !== bValue) {
              return sort === 'asc' ? aValue - bValue : bValue - aValue;
            }
          }
          // Handle strings and other types
          else {
            const aString = String(aValue || '');
            const bString = String(bValue || '');
            if (aString !== bString) {
              return sort === 'asc'
                ? aString.localeCompare(bString)
                : bString.localeCompare(aString);
            }
          }
        }
        return 0;
      });
    }

    const start = page * pageSize;
    const end = start + pageSize;

    const allBasics = Array.from(
      new Set(
        this.cachedData
          .flatMap((inspection) => inspection.violations)
          .map((violation) => violation.basic)
          .filter((basic) => basic)
      )
    ) as string[];

    const allStatus = Array.from(
      new Set(this.cachedData.map((inspection) => inspection.status.key))
    ) as string[];

    if (!this.cachedData.length) return null;
    return {
      items: filteredData.slice(start, end),
      total: filteredData.length,
      allBasics,
      allStatus,
      allAssignedTo: [],
    };
  }

  async getInspection(reportNumber: string): Promise<ResponseGetInspection> {
    const inspection = this.cachedData.find(
      (inspection) => inspection.reportNumber === reportNumber
    );

    if (!inspection) {
      return null;
    }

    const vehiclePromises = inspection.vehicles.map(async (vehicle) => ({
      ...vehicle,
      vehicleInfo: await this.vehicleService.decodeVin(
        vehicle.vehicleIdNumber as string
      ),
      linkedInspections: this.cachedData.filter((i) =>
        i.vehicles.some((v) => v.vehicleIdNumber === vehicle.vehicleIdNumber)
      ),
    }));

    const vehiclesWithInfo = await Promise.all(vehiclePromises);

    return {
      ...inspection,
      vehicles: vehiclesWithInfo as Vehicle[],
    };
  }

  // TODO: discover how this API works
  async getInspectionDetails(reportNumber: string): Promise<any> {
    const url = `${process.env.FMCS_API_URL}/SMS/Event/Inspection/${reportNumber}.aspx`;
    const response = await axios.get(url);
    return response.data;
  }

  async cleanInspectionData() {
    this.cachedData = [];
    return { message: 'Cleaned inspection data' };
  }
}
