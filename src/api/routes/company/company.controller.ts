import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from 'src/api/services/company.service';
import { CompanyToCreateDto } from 'src/domain/dtos/company/CompanyToCreateDto';
import { CompanyToUpdateDto } from 'src/domain/dtos/company/CompanyToUpdateDto';
import { Company } from 'src/domain/entities/Company';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post() // OK
  async create(@Body() newCompany: CompanyToCreateDto): Promise<Company> {
    const createdCompany = await this.companyService.create(newCompany);
    return createdCompany;
  }

  @Put(':id') //OK
  async update(
    @Param('id') id: string,
    @Body() companyToUpdate: CompanyToUpdateDto,
  ): Promise<Company> {
    const updatedCompany = await this.companyService.update(
      id,
      companyToUpdate,
    );
    return updatedCompany;
  }

  @Delete(':id') //OK
  async deleteById(@Param('id') id: string): Promise<Company> {
    const deletedCompany = await this.companyService.deleteById(id);
    return deletedCompany;
  }

  @Get(':id') //OK
  async findById(@Param('id') id: string): Promise<Company> {
    const foundCompany = await this.companyService.findById(id);
    return foundCompany;
  }

  @Get() // OK
  async fetchAll(): Promise<Company[]> {
    const companies = await this.companyService.fetchAll();
    return companies;
  }
}
