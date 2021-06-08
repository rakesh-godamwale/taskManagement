import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CSVController } from './csv.controller';
import { CSVService } from './csv.service';
import { StorageLocation } from './entity/storage-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StorageLocation])],
  controllers: [CSVController],
  providers: [CSVService],
})
export class CSVModule {}
