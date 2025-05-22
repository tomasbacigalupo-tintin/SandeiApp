import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("formation")
export class Formation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;
}
