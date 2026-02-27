import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import type { PublicUser } from '@jirakli/shared';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<PublicUser[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: string): Promise<PublicUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    // Return public user (without password hash)
    return this.toPublicUser(user);
  }

  async update(
    id: string,
    data: { displayName?: string },
  ): Promise<PublicUser> {
    // Verify user exists
    await this.findById(id);

    const updated = await this.usersRepository.update(id, data);
    return this.toPublicUser(updated);
  }

  private toPublicUser(user: {
    id: string;
    email: string;
    displayName: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
  }): PublicUser {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
