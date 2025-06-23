import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name ?? '',
        },
      });
      return { message: 'User berhasil didaftarkan' };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('Email sudah digunakan');
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email tidak terdaftar');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Password tidak valid');
    }

    const payload = { id: user.id, email: user.email, name:user.name};
    const token = await this.jwt.signAsync(payload);

    return {
      message: 'Login berhasil',
      access_token: token,
    };
  }
}
