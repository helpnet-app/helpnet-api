import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrganizationService } from 'src/api/services/organization.service';
import { OrganizationToCreateDto } from 'src/domain/dtos/organization/OrganizationToCreateDto';
import { OrganizationToUpdateDto } from 'src/domain/dtos/organization/OrganizationToUpdateDto';
import { Organization } from 'src/domain/entities/Organization';

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  async create(
    @Body() newOrganization: OrganizationToCreateDto,
  ): Promise<Organization> {
    const createdOrganization =
      await this.organizationService.create(newOrganization);
    return createdOrganization;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() organizationToUpdate: OrganizationToUpdateDto,
  ): Promise<Organization> {
    const updatedOrganization = await this.organizationService.update(
      id,
      organizationToUpdate,
    );
    return updatedOrganization;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Organization> {
    const deletedOrganization = await this.organizationService.deleteById(id);
    return deletedOrganization;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Organization> {
    const foundOrganization = await this.organizationService.findById(id);
    return foundOrganization;
  }

  @Get()
  async fetchAll(): Promise<Organization[]> {
    const organizations = await this.organizationService.fetchAll();
    return organizations;
  }
}
