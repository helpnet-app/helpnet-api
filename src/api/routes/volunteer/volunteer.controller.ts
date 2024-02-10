import { Body, Controller, Post, Put, Delete, Param, Get } from "@nestjs/common";
import { VolunteerService } from "src/api/services/volunteer.service";
import { Volunteer } from "src/domain/entities/Volunteer";

@Controller('volunteers')
export class VolunteerController {
    constructor(private volunteerService: VolunteerService) {}

    @Post()
    create(@Body() newVolunteer: Volunteer): Promise<Volunteer> {
        return this.volunteerService.create(newVolunteer);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() volunteerToUpdate: Volunteer): Promise<Volunteer> {
        return this.volunteerService.update(id, volunteerToUpdate);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string): Promise<Volunteer> {
        return this.volunteerService.deleteById(id);
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Volunteer> {
        return this.volunteerService.findById(id);
    }

    @Get()
    fetchAll(): Promise<Volunteer[]> {
        return this.volunteerService.fetchAll();
    }
}
