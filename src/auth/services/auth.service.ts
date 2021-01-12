import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user.respository';
import { AuthCredentialDto } from '../dto/auth-credential.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/user.entity';


@Injectable()
export class AuthService {

  constructor(
      @InjectRepository(UserRepository) 
      private userRepository: UserRepository,
      private jwtService: JwtService,
      ) {}

  async signUp(authCredentialsDto : AuthCredentialDto):  Promise<void> {
      return this.userRepository.signUp(authCredentialsDto);
  } 

  async signIn(authCredentialsDto : AuthCredentialDto): Promise<{user:User,accessToken:string}>{
      const user = await this.userRepository.validateUserPassword(authCredentialsDto);
      if (!user) {
          throw new UnauthorizedException('invalid credentials')
      }

      const { username, ...rest} = user
      const payload : JwtPayload = {username};
      const accessToken = this.jwtService.sign(payload);
      return {user,accessToken};
  } 

}
