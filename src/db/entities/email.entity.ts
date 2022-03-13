import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmailEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email_type: string;

  @Column()
  user_email: string;

  @Column()
  subject: string;

  @Column()
  text: string;

  @Column()
  timestamp: Date;
}
