import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCheckPointDto } from './dto/create-checkpoint.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';

@ApiTags('events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create event' })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
    type: Event,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'List of all events',
    type: [Event],
  })
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':event_id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({
    status: 200,
    description: 'The event with the given ID',
    type: Event,
  })
  @ApiParam({
    name: 'event_id',
    description: 'Event ID',
    example: '672e55e2dd224ee700702525',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findOne(@Param('event_id') event_id: string) {
    return this.eventService.findOne(event_id);
  }

  @Post(':event_id/checkpoints')
  @ApiOperation({ summary: 'Add checkpoint to event' })
  @ApiResponse({
    status: 201,
    description: 'The checkpoint has been successfully added to the event.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  addCheckPoint(
    @Param('event_id') event_id: string,
    @Body() createCheckPointDto: CreateCheckPointDto,
  ) {
    return this.eventService.addCheckPoint(event_id, createCheckPointDto);
  }
}
