import { Entity ,BaseEntity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm';
import * as bycrpt from 'bcrypt';


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

    @Column()
    salt: string ;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bycrpt.hash(password,this.salt);
        return hash === this.password;
    }
};