import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "Soldiers" })
export class Soldier {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  name: string;

  @Column("date")
  draftDate: string;
}
