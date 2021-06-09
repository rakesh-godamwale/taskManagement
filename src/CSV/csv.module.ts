import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import multer from 'multer';
import { CSVController } from './csv.controller';
import { CSVService } from './csv.service';
import { StorageLocation } from './entity/storage-location.entity';

@Module({
  imports: [
    // MulterModule.registerAsync({
    //   // useFactory: () => ({ dest: 'files' }),
    // }),
    TypeOrmModule.forFeature([StorageLocation]),
  ],
  controllers: [CSVController],
  providers: [CSVService],
})
export class CSVModule {}
