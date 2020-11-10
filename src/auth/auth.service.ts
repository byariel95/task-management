import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { promises } from 'fs';
import { JwtPayload } from './interfaces/jwt-payload.interface';


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

  async signIn(authCredentialsDto : AuthCredentialDto): Promise<{accessToken:string}>{
      const username = await this.userRepository.validateUserPassword(authCredentialsDto);
      if (!username) {
          throw new UnauthorizedException('invalid credentials')
      }

      const payload : JwtPayload = {username};
      const accessToken = await this.jwtService.sign(payload);
      return {accessToken};
  } 

}
