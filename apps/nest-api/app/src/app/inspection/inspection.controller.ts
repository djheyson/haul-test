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
import { InspectionService } from './inspection.service';
import type {
  ResponseGetInspections,
  ResponseGetInspection,
  Filters,
} from './inspection.service';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';

@Controller('inspection')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Get()
  async getInspections(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('filters') filters?: Filters
  ): Promise<ResponseGetInspections> {
    return this.inspectionService.getInspections(
      page ? Number(page) : 0,
      pageSize ? Number(pageSize) : 100,
      filters
    );
  }

  @Get(':reportNumber')
  async getInspection(
    @Param('reportNumber') reportNumber: string
  ): Promise<ResponseGetInspection> {
    return this.inspectionService.getInspection(reportNumber);
  }

  private fileChunks: Map<string, Buffer[]> = new Map();

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: any,
    @Body()
    body: {
      fileId: string;
      partNumber: string;
      totalParts: string;
      isLastPart: string;
    }
  ) {
    const { fileId, partNumber, totalParts, isLastPart } = body;
    const isLast = isLastPart === 'true';
    const total = parseInt(totalParts);
    const current = parseInt(partNumber);

    if (!this.fileChunks.has(fileId)) {
      this.fileChunks.set(fileId, new Array(total));
    }

    const chunks = this.fileChunks.get(fileId);
    if (!chunks) return { message: 'File upload error: Invalid file ID' };

    if (current >= total) {
      throw new Error(`Invalid part number: ${current} of ${total}`);
    }

    chunks[current] = file.buffer;

    if (isLast) {
      const missingParts = chunks
        .map((chunk, index) => (chunk ? null : index))
        .filter((index) => index !== null);

      if (missingParts.length > 0) {
        throw new Error(`Missing parts: ${missingParts.join(', ')}`);
      }

      try {
        const completeFile = Buffer.concat(chunks);
        const result = await this.inspectionService.loadDataFromUpload(
          completeFile.toString()
        );
        this.fileChunks.delete(fileId);
        return result;
      } catch (error) {
        this.fileChunks.delete(fileId);
        throw error;
      }
    }

    return { message: `Part ${current} of ${total} uploaded successfully` };
  }

  @Post('clean')
  async cleanInspectionData() {
    return this.inspectionService.cleanInspectionData();
  }

  @Post('fetch')
  async fetchInspections(@Body() body: { carrierId: string }) {
    const { carrierId } = body;
    const url = `${process.env.FMCS_API_URL}/SMS/Carrier/${carrierId}/Download.aspx?BASIC=0&FileType=XML`;

    try {
      const response = await axios.get(url);
      return this.inspectionService.loadDataFromUpload(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch inspections: ${error}`);
    }
  }
}
