import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('storage_location')
export class StorageLocation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  zoneId: string;

  @Column()
  rackId: string;

  @Column()
  layerId: string;

  @Column()
  binId: string;

  @Column()
  code: string;
}
