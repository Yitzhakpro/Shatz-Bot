import { Entity, Column, PrimaryColumn } from "typeorm";
import { nanoid } from "nanoid";

@Entity({ name: "Soldiers" })
export class Soldier {
  @PrimaryColumn({ default: nanoid() })
  id: string;

  @Column()
  name: string;

  @Column("date")
  draftDate: Date;
}
