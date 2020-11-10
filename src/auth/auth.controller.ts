import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';



@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto): Promise<void>  {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('signin')
    signIp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto): Promise<{accessToken:string}> {
        return this.authService.signIn(authCredentialsDto);
    }

  
}
