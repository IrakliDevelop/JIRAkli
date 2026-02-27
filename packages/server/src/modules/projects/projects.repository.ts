import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE } from '../../database';
import type { DrizzleDatabase } from '../../database';
import { projects, type Project, type InsertProject } from '@jirakli/shared';

@Injectable()
export class ProjectsRepository {
  constructor(@Inject(DATABASE) private readonly db: DrizzleDatabase) {}

  async findById(id: string): Promise<Project | null> {
    const result = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByKey(key: string): Promise<Project | null> {
    const result = await this.db
      .select()
      .from(projects)
      .where(eq(projects.key, key))
      .limit(1);

    return result[0] ?? null;
  }

  async findAll(): Promise<Project[]> {
    return this.db.select().from(projects);
  }

  async create(
    data: Omit<InsertProject, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Project> {
    const now = new Date();
    const [created] = await this.db
      .insert(projects)
      .values({
        id: crypto.randomUUID(),
        ...data,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    data: Partial<Pick<Project, 'name' | 'description'>>,
  ): Promise<Project> {
    const [updated] = await this.db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();

    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(projects).where(eq(projects.id, id));
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    return result.length > 0;
  }
}
