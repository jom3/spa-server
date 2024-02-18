import { Animal } from 'src/animals/entities/animal.entity';
import { AttentionType } from 'src/attention/attention-type/entities/attention-type.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttentionDetail } from './attention-detail.entity';

@Entity()
export class Attention {
  @PrimaryGeneratedColumn('uuid')
  attentionId: string;
  @Column({ type: 'text' })
  attentionTypeId: string;
  @Column({ type: 'text' })
  animalId: string;
  @Column({ type: 'text' })
  animalName: string;
  @Column({ type: 'boolean', default:true })
  status: boolean;
  @Column({ type: 'date' })
  createdAt: Date;
  @Column({ type: 'date', nullable:true })
  closedAt: Date;
  @ManyToOne(() => AttentionType, (attentionType) => attentionType.attention, {
    eager: true,
    cascade:true
  })
  @JoinColumn({ name: 'attentionTypeId' })
  attentionType: AttentionType;

  @OneToMany(
    () => AttentionDetail,
    (attentionDetail) => attentionDetail.attention,
    {
      eager:true
    }
    )
    attentionDetail: AttentionDetail[];

  @ManyToOne(() => Animal, (animal) => animal.attention, {
    eager:true
  })
  @JoinColumn({ name: 'animalId' })
  animal: Animal;

  @BeforeInsert()
  onCreate() {
    this.createdAt = new Date();
  }
}
