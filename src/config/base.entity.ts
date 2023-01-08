import { CreateDateColumn, PrimaryGeneratedColumn,UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  create_at!: Date;
  @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
  update_at!: Date;
}
