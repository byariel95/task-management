import { Repository, EntityRepository } from 'typeorm';
import { User} from './entities/user.entity';
import { AuthCredentialDto} from './dto/auth-credential.dto'
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> 
{
    async signUp (authCredentialsDto: AuthCredentialDto): Promise<void> {
        const { username, password} = authCredentialsDto;

        const user = new User()
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);
        

        try {
            await user.save();
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exist');
            } else {
                console.log(error.code);
                throw new InternalServerErrorException('internal server');
          
            }
        }

        
    }

    async validateUserPassword (authCredentialsDto: AuthCredentialDto): Promise<string>
    {
        const { username, password} = authCredentialsDto;
        const user = await this.findOne({ username })
        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }

    }

    private async hashPassword(password: string, salt: string ): Promise<string>{
        return bcrypt.hash(password, salt);
    }

}