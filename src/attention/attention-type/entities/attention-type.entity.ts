import { Attention } from "src/attention/attention/entities/attention.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttentionType {
  @PrimaryGeneratedColumn('uuid')
  attentionTypeId:string;
  @Column({type:'text', unique:true})
  name:string;
  @Column({type:'text', nullable:true})
  desc:string;
  @Column({type:'boolean', default:true})
  status:boolean;

  @OneToMany(()=>Attention,(attention)=>attention.attentionType)
  attention:Attention
}
