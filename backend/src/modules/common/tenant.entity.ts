import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  tenantId!: string;
}
