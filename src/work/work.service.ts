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