import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class CheckpointService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(checkpoint_id: string) {
    const checkpoint = await this.prisma.checkPoints.findUnique({
      where: {
        id: checkpoint_id,
      },
    });
    if (!checkpoint) {
      return new NotFoundException('Checkpoint not found');
    }
    return {
      checkpoint,
      message: 'Checkpoint found',
    };
  }
}
