import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CSVService } from './csv.service';
import { StorageLocationDto } from './dto/storage-location.dto';
import { StorageLocation } from './entity/storage-location.entity';

@ApiTags('CSV')
@Controller('csv')
export class CSVController {
  constructor(
    @Inject(CSVService)
    public csvService: CSVService,
  ) {}

  @Get()
  async getAllLocation(): Promise<StorageLocation[]> {
    return this.csvService.getAllLocation();
  }
  @Post()
  async createStorageLocation(
    @Body(new ValidationPipe({ transform: true }))
    storageLocationDto: StorageLocationDto,
  ): Promise<StorageLocation> {
    return this.csvService.saveData(storageLocationDto);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCSV(@UploadedFile() file): Promise<void> {
    console.log(file);
    return this.csvService.uploadCSV(file);
  }
}
