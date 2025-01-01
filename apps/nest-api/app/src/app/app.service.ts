import { Injectable } from '@nestjs/common';
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
export class AppService {
  private cachedData: InspectionData[] = [];

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

    // Apply sorting if present
    if (filters.sort?.length) {
      filteredData.sort((a, b) => {
        for (const { field, sort } of filters?.sort || []) {
          const aValue = a[field as keyof InspectionData] || '';
          const bValue = b[field as keyof InspectionData] || '';
          if (aValue !== bValue) {
            return sort === 'asc'
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
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
    return (
      this.cachedData.find(
        (inspection) => inspection.reportNumber === reportNumber
      ) || null
    );
  }

  async cleanInspectionData() {
    this.cachedData = [];
    return { message: 'Cleaned inspection data' };
  }
}
