import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get(':vin')
  async getVehicleInfo(@Param('vin') vin: string) {
    const vehicleInfo = await this.vehicleService.decodeVin(vin);
    const history = await this.vehicleService.getVehicleHistory(vin);
    const linkedEquipment = await this.vehicleService.getLinkedEquipment(vin);

    return {
      vehicleInfo,
      history,
      linkedEquipment,
    };
  }
}
