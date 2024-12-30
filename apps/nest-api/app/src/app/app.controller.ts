import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PaginatedResponse, InspectionData } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number
  ): Promise<PaginatedResponse<InspectionData>> {
    return this.appService.getData(
      page ? Number(page) : 0,
      pageSize ? Number(pageSize) : 100
    );
  }
}
