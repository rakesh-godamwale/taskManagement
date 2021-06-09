import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageLocationDto } from './dto/storage-location.dto';
import { StorageLocation } from './entity/storage-location.entity';
const csv = require('csvtojson');

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
    let locations: any[];

    csv({
      noheader: false,
      output: 'json',
    })
      .fromString(file.buffer.toString())
      .then(async (csvRow) => {
        console.log(csvRow);
        locations = csvRow;
      });

    const storageLocations = locations.map((storageLocationDto) => {
      const storageLocationDao = new StorageLocation();
      storageLocationDao.name = storageLocationDto.name;
      storageLocationDao.zoneId = storageLocationDto.zoneId;
      storageLocationDao.rackId = storageLocationDto.rackId;
      storageLocationDao.layerId = storageLocationDto.layerId;
      storageLocationDao.binId = storageLocationDto.binId;
      storageLocationDao.code = storageLocationDto.code;

      return storageLocationDao;
    });

    console.log(storageLocations);
    //using save()
    // await this.storageLocation.save(csvRow);

    //using querybuilder

    //   const query = await this.storageLocation
    //   .createQueryBuilder()
    //   .insert()
    //   .into('storage_location', [
    //     'name',
    //     'zoneId',
    //     'rackId',
    //     'layerId',
    //     'binId',
    //     'code',
    //   ])
    //   .values(csvRow)
    //   .onConflict(
    //     `("name") DO UPDATE SET "zoneId" = excluded."zoneId" , "rackId" = excluded."rackId" , "layerId" = excluded."layerId" , "binId" = excluded."binId" , "code" = excluded."code"`,
    //   )
    //   .execute();
    // console.log(query);

    // const fileContent = file.buffer.toString();
    // var totalRow = fileContent.split('\r\n');

    // totalRow.shift();
    // const result = totalRow.map((row) => {
    //   const rowData = row.split(',');
    //   return rowData;
    // });

    // const responseData = result.map((row) => {
    //   let i = 0;
    //   return {
    //     name: row[i++],
    //     zoneId: row[i++],
    //     rackId: row[i++],
    //     layerId: row[i++],
    //     binId: row[i++],
    //     code: row[i++],
    //   };
    // });

    // let responseData = [];
    // await fs
    //   .createReadStream('sample.csv')
    //   .pipe(csv())
    //   .on('data', (data) => responseData.push(data))
    //   .on('end', async () => {
    //     // console.log(responseData);
    //     const query = await this.storageLocation
    //       .createQueryBuilder()
    //       .insert()
    //       .into('storage_location', [
    //         'name',
    //         'zoneId',
    //         'rackId',
    //         'layerId',
    //         'binId',
    //         'code',
    //       ])
    //       .values(responseData)
    //       .onConflict(
    //         `("name") DO UPDATE SET "zoneId" = excluded."zoneId" , "rackId" = excluded."rackId" , "layerId" = excluded."layerId" , "binId" = excluded."binId" , "code" = excluded."code"`,
    //       )
    //       .execute();
    //     console.log(query);
    //   });
  }
}

// const storageLocations = fileContent.split('\r\n');
// storageLocations.shift();
// const locations = storageLocations.map(e => {
//   const rowData = e.split(',');
//   // if (rowData.length > 5)
//   //   throw new BadRequestException(
//   //     `please check, fields should be in formate (name,zone,rack,layer,bin). it should not exceed from these fields`,
//   //   );
//   const storageLocation = new StorageLocation();
//   storageLocation.name = rowData[0];
//   storageLocation.zoneId = rowData[1];
//   storageLocation.rackId = rowData[2];
//   storageLocation.layerId = rowData[3];
//   storageLocation.binId = rowData[4];
//   storageLocation.warehouseId = warehouseId;
//   return storageLocation;
// });

// await this.storageLocation.save(storageLocations);

// locations.map(async data => {
//   const location = await this.storageLocation.findOne({ name: data.name });
//   if (location !== undefined) {
//     await this.saveStorageLocation(data, warehouseId, location.id);
//   } else {
//     await this.saveStorageLocation(data, warehouseId);
//   }
// });
