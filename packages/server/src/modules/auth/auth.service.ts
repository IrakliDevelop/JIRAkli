import {
  Injectable,
  Inject,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { DATABASE } from '../../database';
import type { DrizzleDatabase } from '../../database';
import { users } from '@jirakli/shared';
import type { AuthResponse, JwtPayload } from '@jirakli/shared';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE) private readonly db: DrizzleDatabase,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    // Check if email already exists
    const existing = await this.db
      .select()
      .from(users)
      .where(eq(users.email, dto.email))
      .limit(1);

    if (existing.length > 0) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Create user
    const now = new Date();
    const [user] = await this.db
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        email: dto.email,
        passwordHash,
        displayName: dto.displayName,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    // Generate JWT
    const accessToken = await this.generateToken(user.id, user.email);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
    };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    // Find user
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, dto.email))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const accessToken = await this.generateToken(user.id, user.email);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
    };
  }

  private async generateToken(userId: string, email: string): Promise<string> {
    const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
      sub: userId,
      email,
    };
    console.log(this.configService.get<string>('JWT_SECRET'));

    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      expiresIn: '7d',
    });
  }
}
