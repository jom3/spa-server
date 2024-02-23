import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDetails } from './user-details.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { AttentionDetail } from 'src/attention/attention/entities/attention-detail.entity';
import { Adopt } from 'src/adopt/entities/adopt.entity';

export enum userRole {
  USER = 'user',
  STAFF = 'staff',
  ADMIN = 'admin',
  SADMIN = 'sadmin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'text' })
  lastName: string;
  @Column({ type: 'text' })
  photo: string;
  @Column({ type: 'text', unique: true })
  email: string;
  @Column({ type: 'text', nullable: true })
  dni: string;
  @Column({ type: 'date' })
  birthDate: Date;
  @Column({ type: 'enum', enum: userRole, array:true, default: [userRole.USER] })
  role: userRole[];
  @Column({ type: 'boolean', default: true })
  status: boolean;
  
  @OneToOne(() => UserDetails, (userDetails) => userDetails.user,{
    eager:true, cascade:true
  })
  userDetails: UserDetails;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth

  @OneToMany(()=>AttentionDetail, (attentionDetail)=>attentionDetail.user)
  attentionDetail:AttentionDetail

  @OneToMany(()=>Adopt,(adopt)=>adopt.user)
  adopt:Adopt
}
