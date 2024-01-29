import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnimalDetails } from './animal.details.entity';

export enum AnimalType{
  FISH = 'fish',
  AMPHIBIANS = 'amphibians',
  REPTILES = 'reptiles',
  BIRDS = 'birds',
  MAMMALS = 'mammals'
}

@Entity()
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  animalId:string;

  @Column({type:'text', unique:true})
  name:string;
  
  @Column({type:'text', nullable:true})
  image:string;

  @Column({type:'boolean', default:false})
  isExtinct:boolean;

  @Column({type:'boolean', default:true})
  isActive:boolean;

  @Column({type:'text'})
  species:string;

  @Column({type:'enum',enum:AnimalType, default:AnimalType.MAMMALS})
  type:AnimalType

  @OneToOne(()=>AnimalDetails, (animalDetails)=>animalDetails.animal,{
    eager:true, cascade:true
  })
  animalDetails:AnimalDetails
}
