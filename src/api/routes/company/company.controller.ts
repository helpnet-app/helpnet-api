import { Body, Controller, Post, Put, Delete, Param, Get } from "@nestjs/common";
import { CompanyService } from "src/api/services/company.service";
import { Company } from "src/domain/entities/Company";

@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Post()
    create(@Body() newCompany: Company): Promise<Company> {
        return this.companyService.create(newCompany);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() companyToUpdate: Company): Promise<Company> {
        return this.companyService.update(id, companyToUpdate);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string): Promise<Company> {
        return this.companyService.deleteById(id);
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Company> {
        return this.companyService.findById(id);
    }

    @Get()
    fetchAll(): Promise<Company[]> {
        return this.companyService.fetchAll();
    }
}
