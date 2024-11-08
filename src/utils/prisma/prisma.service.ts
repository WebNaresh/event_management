import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  async onModuleDestroy() {
    console.log('Disconnecting from the database...');
    await this.$disconnect();
  }

  async createSecurityGuard(data: {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    password: string;
  }) {
    return this.user.create({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        middle_name: data.middleName,
        email: data.email,
        password: data.password,
        role: 'SECURITY',
      },
    });
  }
}
