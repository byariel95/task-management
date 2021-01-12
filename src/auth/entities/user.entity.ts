import { Entity ,BaseEntity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert} from 'typeorm';
import {compare, genSalt, hash } from 'bcryptjs'


@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column('boolean', {default: true})
    status: boolean;


    @BeforeInsert()
    async hashPassword() {
      if (!this.password){
        return;
      }
      const salt = await genSalt(10)
      this.password = await hash(this.password, salt);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await compare(password, this.password);
    }
};