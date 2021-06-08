import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageLocationDto } from './dto/storage-location.dto';
import { StorageLocation } from './entity/storage-location.entity';

@Injectable()
export class CSVService {
  constructor(
    @InjectRepository(StorageLocation)
    private storageLocation: Repository<StorageLocation>,
  ) {}

  async getAllLocation(): Promise<StorageLocation[]> {
    return await this.storageLocation.find();
  }

  async saveData(
    storageLocationDto: StorageLocationDto,
  ): Promise<StorageLocation> {
    const storageLocationDao = new StorageLocation();
    storageLocationDao.name = storageLocationDto.name;
    storageLocationDao.zoneId = storageLocationDto.zoneId;
    storageLocationDao.rackId = storageLocationDto.rackId;
    storageLocationDao.layerId = storageLocationDto.layerId;
    storageLocationDao.binId = storageLocationDto.binId;
    storageLocationDao.code = storageLocationDto.code;

    storageLocationDao.save();
    return storageLocationDao;
  }

  async uploadCSV(file: any): Promise<void> {
    const fileContent = file.buffer.toString();
    var totalRow = fileContent.split('\r\n');

    totalRow.shift();
    const result = totalRow.map((row) => {
      const rowData = row.split(',');
      return rowData;
    });

    const responseData = result.map((row) => {
      let i = 0;
      return {
        name: row[i++],
        zoneId: row[i++],
        rackId: row[i++],
        layerId: row[i++],
        binId: row[i++],
        code: row[i++],
      };
    });
    console.log(responseData);

    const query = await this.storageLocation
      .createQueryBuilder()
      .insert()
      .into('storage_location', [
        'name',
        'zoneId',
        'rackId',
        'layerId',
        'binId',
        'code',
      ])
      .values(responseData)
      .onConflict(
        `("name") DO UPDATE SET "zoneId" = excluded."zoneId" , "rackId" = excluded."rackId" , "layerId" = excluded."layerId" , "binId" = excluded."binId" , "code" = excluded."code"`,
      )
      .execute();

    console.log(query);
  }
}
