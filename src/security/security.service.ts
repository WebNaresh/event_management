import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateSecurityDto } from './dto/create-security.dto';

@ApiTags('security')
@Injectable()
export class SecurityService {
  constructor(private prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new security guard' })
  @ApiResponse({
    status: 201,
    description: 'The security guard has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(createSecurityDto: CreateSecurityDto) {
    return this.prisma.createSecurityGuard(createSecurityDto);
  }

  @ApiOperation({ summary: 'Get security guards without assigned events' })
  @ApiResponse({
    status: 200,
    description: 'The security guards have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'No security guards found.' })
  async findMany(event_id: string) {
    return this.prisma.user.findMany({
      where: {
        role: 'SECURITY',
        events_security_asigned: {
          none: {
            id: event_id,
          },
        },
      },
    });
  }
}
