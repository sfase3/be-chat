import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Delete('logout')
  async logout(@Req() req) {
    return await this.authService.logOut(
      req.headers['authorization'].split(' ')[1],
    );
  }

  @Post('login')
  login(@Body() dto: { email: string; password: string }) {
    return this.authService.signIn(dto.email, dto.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getInfo(@Req() req) {
    return await this.authService.getUser(req.headers['authorization']);
  }

  @Get('tokens')
  getUsers() {
    return this.authService.getAllTokens();
  }
}
