import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { InspectionService } from '../inspection/inspection.service';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly inspectionService: InspectionService
  ) {}

  @Get(':vin')
  async getVehicleInfo(@Param('vin') vin: string) {
    const vehicleInfo = await this.vehicleService.decodeVin(vin);
    const history = await this.vehicleService.getVehicleHistory(vin);
    const linkedEquipment = await this.vehicleService.getLinkedEquipment(vin);
    const cachedData = this.inspectionService.getCachedData();

    return {
      vehicleInfo,
      history,
      linkedEquipment,
      linkedInspections: cachedData.filter((i) =>
        i.vehicles.some((v) => v.vehicleIdNumber === vin)
      ),
    };
  }
}
