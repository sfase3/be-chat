import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Token } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getAllTokens() {
    return await this.tokenRepository.findAll();
  }

  async findByToken(token) {
    const user = await this.tokenRepository.findOne({
      where: { refreshToken: token },
    });
    return user;
  }

  async getUser(token) {
    try {
      const user = await this.findByToken(token.split(' ')[1]);
      if (!user) {
        return false;
      }
      const getUserInfo = await this.usersService.getUserById(
        String(user.userId),
      );
      return getUserInfo;
    } catch (err) {
      console.error('Error finding user by token:', err);
      throw err;
    }
  }

  async logOut(token) {
    const tokenRecord = await this.tokenRepository.findOne({
      where: { refreshToken: token },
    });
    if (tokenRecord) {
      await tokenRecord.destroy();
      return true;
    } else {
      return false;
    }
  }

  async signIn(email, pass) {
    const user = await this.usersService.getUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.nickname, lastName: user.lastName };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    const currentDate = new Date(); // текущая дата и время
    const expirationDate = new Date(); // новый объект даты и времени
    expirationDate.setDate(currentDate.getDate() + 7);
    const existingToken = await this.tokenRepository.findOne({
      where: { userId: user.id },
    });
    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      existingToken.expirationDate = expirationDate;
      await existingToken.save();
    } else {
      await this.tokenRepository.create({
        userId: user.id,
        refreshToken,
        expirationDate,
      });
    }

    // return this.tokenRepository.findAll();
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '5m',
      }),
      refreshToken: refreshToken,
      expiresIn: expirationDate,
    };
  }
}
