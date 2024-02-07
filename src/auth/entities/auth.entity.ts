import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryColumn()
  userId: string;
  @Column({ type: 'text', unique: true })
  email: string;
  @Column({ type: 'text'})
  password: string;
  @OneToOne(()=>User, (user)=>user.auth)
  @JoinColumn({name:'userId'})
  user:User;
}
