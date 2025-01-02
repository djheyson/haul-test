import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InspectionData } from '../inspection/inspection.service';

export interface VehicleInfo {
  vehicleIdNumber: string;
  make: string;
  model: string;
  modelYear: string;
  vehicleType: string;
  manufacturer: string;
  bodyCabType: string;
  bodyClass: string;
  brakeSystemType: string;
  driveType: string;
  fuelTypePrimary: string;
  vehicleDescriptor: string;
}

export interface VehicleResponse {
  vehicleInfo: VehicleInfo;
  history: any[];
  linkedEquipment: any[];
  linkedInspections: InspectionData[];
}

@Injectable()
export class VehicleService {
  private readonly baseUrl = `${process.env.VIN_API_URL}/api`;

  async decodeVin(vin: string): Promise<VehicleInfo | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/vehicles/DecodeVinValues/${vin}?format=json`
      );

      const result = response.data.Results[0];

      return {
        vehicleIdNumber: vin,
        make: result.Make,
        model: result.Model,
        modelYear: result.ModelYear,
        vehicleType: result.VehicleType,
        manufacturer: result.Manufacturer,
        bodyCabType: result.BodyCabType,
        bodyClass: result.BodyClass,
        brakeSystemType: result.BrakeSystemType,
        driveType: result.DriveType,
        fuelTypePrimary: result.FuelTypePrimary,
        vehicleDescriptor: result.VehicleDescriptor,
      };
    } catch (error) {
      console.error('Error decoding VIN:', error);
      return null;
    }
  }

  async getVehicleHistory(vin: string) {
    // Get all inspections for this VIN
    // You'll need to implement this based on your data structure
    console.log('getVehicleHistory', vin);
  }

  async getLinkedEquipment(vin: string) {
    // Get all trailers/equipment linked to this vehicle
    // You'll need to implement this based on your data structure
    console.log('getLinkedEquipment', vin);
  }
}
