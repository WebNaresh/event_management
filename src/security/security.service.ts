import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateSecurityDto } from './dto/create-security.dto';

@Injectable()
export class SecurityService {
  constructor(private prisma: PrismaService) {}

  async create(createSecurityDto: CreateSecurityDto) {
    return this.prisma.createSecurityGuard(createSecurityDto);
  }
}
