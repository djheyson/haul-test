import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import type {
  ResponseGetInspections,
  ResponseGetInspection,
  Filters,
} from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getInspections(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('filters') filters?: Filters
  ): Promise<ResponseGetInspections> {
    return this.appService.getInspections(
      page ? Number(page) : 0,
      pageSize ? Number(pageSize) : 100,
      filters
    );
  }

  @Get('inspection/:reportNumber')
  async getInspection(
    @Param('reportNumber') reportNumber: string
  ): Promise<ResponseGetInspection> {
    return this.appService.getInspection(reportNumber);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 50 * 1024 * 1024 } })
  )
  async uploadFile(@UploadedFile() file: any) {
    return this.appService.loadDataFromUpload(file.buffer.toString());
  }

  @Post('clean')
  async cleanInspectionData() {
    return this.appService.cleanInspectionData();
  }

  @Post('fetch-inspections')
  async fetchInspections(@Body() body: { carrierId: string }) {
    const { carrierId } = body;
    const url = `https://ai.fmcsa.dot.gov/SMS/Carrier/${carrierId}/Download.aspx?BASIC=0&FileType=XML`;

    try {
      const response = await axios.get(url);
      return this.appService.loadDataFromUpload(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch inspections: ${error}`);
    }
  }
}
