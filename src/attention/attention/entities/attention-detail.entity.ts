import { User } from 'src/user/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attention } from './attention.entity';

@Entity()
export class AttentionDetail {
  @PrimaryGeneratedColumn('uuid')
  attentionDetailId: string;
  @Column({type:'text'})
  attentionId: string;
  @Column({type:'text'})
  userId: string;
  @Column({type:'text', nullable:true})
  reason: string;
  @Column({type:'text', default:[]})
  image: string[];
  @Column({type:'boolean', default:true})
  status: boolean;
  @Column({type:'date'})
  createdAt: Date;
  @Column({type:'date', nullable:true})
  updatedAt: Date;
  @Column({type:'date', nullable:true})
  deletedAt: Date;

  @ManyToOne(()=>User, (user)=>user.attentionDetail,{
    eager:true
  })
  @JoinColumn({name:'userId'})
  user:User;

  @ManyToOne(()=>Attention,(attention)=>attention.attentionDetail)
  @JoinColumn({name:'attentionId'})
  attention:Attention

  @BeforeInsert()
  onCreate(){
    this.createdAt = new Date()
  }

  @BeforeUpdate()
  onUpdate(){
    this.updatedAt = new Date()
  }
}
