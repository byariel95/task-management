import { Controller, Post, Body, Put, Param, Delete, ValidationPipe} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './entities/user.entity';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto): Promise<void>  {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('login')
    signIp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto): Promise<{user:User, accessToken:string}> {
        return this.authService.signIn(authCredentialsDto);
    }

  
}
