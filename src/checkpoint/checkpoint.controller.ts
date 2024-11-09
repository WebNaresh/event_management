import { Controller, Get, Param } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';

@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Get(':checkpoint_id')
  findOne(@Param('checkpoint_id') checkpoint_id: string) {
    return this.checkpointService.findOne(checkpoint_id);
  }
}
