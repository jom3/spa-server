import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import { Animal } from "./animal.entity";

export enum BornType{
  EGG = 'egg',
  BIRTH = 'birth'
}

@Entity()
export class AnimalDetails {

  @PrimaryColumn()
  animalDetailId:string;

  @Column({type:'numeric'})
  maxAge:number;

  @Column({type:'enum', enum:BornType, default:BornType.BIRTH})
  bornBy:BornType;

  @OneToOne(()=>Animal, (animal)=>animal.animalDetails)
  @JoinColumn({name:'animalDetailId'})
  animal:Animal;
}