import { Animal } from "src/animals/entities/animal.entity";
import { User } from "src/user/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdoptControl } from "./adopt-control.entity";

export enum ControlType {
  BIWEEKLY='biweekly',
  MONTHLY='monthly',
  YEARLY='yearly'
}

@Entity()
export class Adopt {
  @PrimaryGeneratedColumn('uuid')
  adoptId:string;
  @Column({type:'text'})
  userId:string
  @Column({type:'text'})
  animalId:string;
  @Column({type:'text'})
  animalName:string;
  @Column({type:'text'})
  reason:string;
  @Column({type:'enum', enum:ControlType, default:ControlType.MONTHLY})
  controlType:ControlType;
  @Column({type:'numeric',default:1})
  status:number;
  @Column({ type: 'date' })
  adoptedAt:Date;
  @Column({ type: 'date', nullable:true })
  closedAt:Date;
  @Column({ type: 'date', nullable:true })
  returnedAt:Date;

  @ManyToOne(()=>User,(user)=>user.adopt,{
    eager:true
  })
  @JoinColumn({name:'userId'})
  user:User;

  @ManyToOne(()=>Animal,(animal)=>animal.adopt,{
    eager:true
  })
  @JoinColumn({name:'animalId'})
  animal:Animal

  @OneToMany(()=>AdoptControl,(adoptControl)=>adoptControl.adopt,{
    eager:true
  })
  adoptControl:AdoptControl
  
  @BeforeInsert()
  create(){
    this.adoptedAt = new Date() 
  }
}
