import { Entity ,BaseEntity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert, OneToMany} from 'typeorm';
import {compare, genSalt, hash } from 'bcryptjs'
import { Task } from 'src/tasks/entities/task.entity';


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

    @OneToMany(type => Task, task=> task.user, {eager: true})
    tasks: Task[]

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