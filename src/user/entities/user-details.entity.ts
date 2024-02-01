import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserDetails {
  @PrimaryColumn()
  userId: string;
  @Column({ type: 'text', nullable: true })
  address1: string;
  @Column({ type: 'text', nullable: true })
  address2: string;
  @Column({ type: 'text' })
  telephone: string;
  @Column({ type: 'text' })
  city: string;
  @OneToOne(() => User, (user) => user.userDetails)
  @JoinColumn({name:'userId'})
  user: User;
}
