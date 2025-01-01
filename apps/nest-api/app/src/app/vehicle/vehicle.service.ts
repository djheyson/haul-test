import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface VehicleInfo {
  vehicleIdNumber: string;
  make: string;
  model: string;
  modelYear: string;
  vehicleType: string;
  manufacturerName: string;
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
        manufacturerName: result.ManufacturerName,
      };
    } catch (error) {
      console.error('Error decoding VIN:', error);
      return null;
    }
  }

  async getVehicleHistory(vin: string) {
    // Get all inspections for this VIN
    // You'll need to implement this based on your data structure
  }

  async getLinkedEquipment(vin: string) {
    // Get all trailers/equipment linked to this vehicle
    // You'll need to implement this based on your data structure
  }
}
