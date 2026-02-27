import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE } from '../../database';
import type { DrizzleDatabase } from '../../database';
import { users, type User, type PublicUser } from '@jirakli/shared';

@Injectable()
export class UsersRepository {
  constructor(@Inject(DATABASE) private readonly db: DrizzleDatabase) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] ?? null;
  }

  async findAll(): Promise<PublicUser[]> {
    const result = await this.db
      .select({
        id: users.id,
        email: users.email,
        displayName: users.displayName,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users);

    return result;
  }

  async update(
    id: string,
    data: Partial<Pick<User, 'displayName'>>,
  ): Promise<User> {
    const [updated] = await this.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return updated;
  }
}
