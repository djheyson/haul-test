import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { InspectionController } from './inspection/inspection.controller';
import { InspectionService } from './inspection/inspection.service';

@Module({
  imports: [],
  controllers: [AppController, VehicleController, InspectionController],
  providers: [AppService, VehicleService, InspectionService],
})
export class AppModule {}
