import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { VolunteerService } from 'src/api/services/volunteer.service';
import { VolunteerToCreateDto } from 'src/domain/dtos/volunteer/VolunteerToCreateDto';
import { Volunteer } from 'src/domain/entities/Volunteer';

@Controller('volunteers')
export class VolunteerController {
  constructor(private volunteerService: VolunteerService) {}

  @Post() // OK
  async create(@Body() newVolunteer: VolunteerToCreateDto): Promise<Volunteer> {
    const createdVolunteer = await this.volunteerService.create(newVolunteer);
    return createdVolunteer;
  }

  @Put(':id') // OK
  async update(
    @Param('id') id: string,
    @Body() volunteerToUpdate: Volunteer,
  ): Promise<Volunteer> {
    const updatedVolunteer = await this.volunteerService.update(
      id,
      volunteerToUpdate,
    );
    return updatedVolunteer;
  }

  @Delete(':id') //OK
  async deleteById(@Param('id') id: string): Promise<Volunteer> {
    const deletedVolunteer = await this.volunteerService.deleteById(id);
    return deletedVolunteer;
  }

  @Get(':id') // OK
  async findById(@Param('id') id: string): Promise<Volunteer> {
    const foundVolunteer = await this.volunteerService.findById(id);
    return foundVolunteer;
  }

  @Get() // OK
  async fetchAll(): Promise<Volunteer[]> {
    const volunteers = await this.volunteerService.fetchAll();
    return volunteers;
  }
}
