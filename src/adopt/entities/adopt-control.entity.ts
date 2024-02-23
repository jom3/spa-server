import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Adopt } from './adopt.entity';

@Entity()
export class AdoptControl {
  @PrimaryGeneratedColumn('uuid')
  adoptControlId: string;
  @Column({type:'text'})
  adoptId:string
  @Column({type:'text'})
  controlReason: string;
  @Column({type:'text'})
  animalStatus: string;
  @Column({type:'text', nullable:true})
  statusDetail: string;
  @Column({type:'boolean',default:false})
  isApproved: boolean;
  @Column({type:'date'})
  createdAt: Date;

  @ManyToOne(()=>Adopt, (adopt)=>adopt.adoptControl)
  @JoinColumn({name:'adoptId'})
  adopt:Adopt

  @BeforeInsert()
  create(){
    this.createdAt = new Date()
  }
}
