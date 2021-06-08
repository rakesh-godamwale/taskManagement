import { IsNotEmpty } from 'class-validator';

export class StorageLocationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  zoneId: string;

  @IsNotEmpty()
  rackId: string;

  @IsNotEmpty()
  layerId: string;

  @IsNotEmpty()
  binId: string;

  @IsNotEmpty()
  code: string;
}
