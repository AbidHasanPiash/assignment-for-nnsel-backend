import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Work } from '@prisma/client';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

@Injectable()
export class WorkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateWorkDto): Promise<Work> {
    return this.prisma.work.create({ data });
  }

  async findAll(): Promise<Work[]> {
    return this.prisma.work.findMany();
  }

  async findOne(id: string): Promise<Work | null> {
    return this.prisma.work.findUnique({ where: { id } });
  }

  async findOneWithNeighbors(id: string) {
    const allWorks = await this.prisma.work.findMany({
      orderBy: { createdAt: 'asc' },
      select: { id: true },
    });

    const currentIndex = allWorks.findIndex((work) => work.id === id);

    if (currentIndex === -1) {
      throw new Error('Work not found');
    }

    const previousItem = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
    const nextItem =
      currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;

    const currentWork = await this.findOne(id);

    return {
      ...currentWork,
      previousItem,
      nextItem,
    };
  }

  async update(id: string, data: UpdateWorkDto): Promise<Work> {
    return this.prisma.work.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.work.delete({ where: { id } });
  }
}