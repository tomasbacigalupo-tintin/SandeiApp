import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string, tenantId: string) {
    if (await this.usersRepo.findOne({ where: { email, tenantId } })) {
      throw new UnauthorizedException('El email ya está en uso');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({
      name,
      email,
      passwordHash,
      role: UserRole.USER,
      tenantId,
    });
    await this.usersRepo.save(user);
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };
    return { token: this.jwtService.sign(payload) };
  }

  async login(email: string, password: string, tenantId: string) {
    const user = await this.usersRepo.findOne({ where: { email, tenantId } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
