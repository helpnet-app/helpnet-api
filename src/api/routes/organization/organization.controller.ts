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
  constructor(private companyService: OrganizationService) {}

  @Post()
  async create(@Body() newCompany: OrganizationToCreateDto): Promise<Organization> {
    const createdCompany = await this.companyService.create(newCompany);
    return createdCompany;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() companyToUpdate: OrganizationToUpdateDto,
  ): Promise<Organization> {
    const updatedCompany = await this.companyService.update(
      id,
      companyToUpdate,
    );
    return updatedCompany;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Organization> {
    const deletedCompany = await this.companyService.deleteById(id);
    return deletedCompany;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Organization> {
    const foundCompany = await this.companyService.findById(id);
    return foundCompany;
  }

  @Get()
  async fetchAll(): Promise<Organization[]> {
    const organizations = await this.companyService.fetchAll();
    return organizations;
  }
}
