import { Body, Controller, Post, Put, Delete, Param, Get } from "@nestjs/common";
import { CompanyService } from "src/api/services/company.service";
import { Company } from "src/domain/entities/Company";

@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Post()
    async create(@Body() newCompany: Company): Promise<Company> {
        const createdCompany = await this.companyService.create(newCompany);
        return createdCompany;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() companyToUpdate: Company): Promise<Company> {
        const updatedCompany = await this.companyService.update(id, companyToUpdate);
        return updatedCompany;
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string): Promise<Company> {
        const deletedCompany = await this.companyService.deleteById(id);
        return deletedCompany;
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Company> {
        const foundCompany = await this.companyService.findById(id);
        return foundCompany;
    }

    @Get()
    async fetchAll(): Promise<Company[]> {
        const companies = await this.companyService.fetchAll();
        return companies;
    }
}
