import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProgramService } from 'src/api/services/program.service';
import { ProgramToCreateDto } from 'src/domain/dtos/program/ProgramToCreateDto';
import { ProgramToUpdateDto } from 'src/domain/dtos/program/ProgramToUpdateDto';
import { Create } from 'src/domain/use_cases/program/Create';
import { FetchAll } from 'src/domain/use_cases/program/FetchAll';
import { FindAllByCompany } from 'src/domain/use_cases/program/FindAllByCompanyId';
import { FindById } from 'src/domain/use_cases/program/FindById';
import { Update } from 'src/domain/use_cases/program/Update';

@Controller('programs')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  @Post(':companyId/create')
  async create(
    @Param('companyId') companyId: string,
    @Body() programToCreate: ProgramToCreateDto,
  ) {
    const createUC = new Create(this.programService);
    return await createUC.execute(companyId, programToCreate);
  }

  @Get()
  async fetchAll() {
    const foundPrograms = new FetchAll(this.programService);
    return await foundPrograms.execute();
  }

  @Get('/company/:companyId')
  async findByCompany(@Param('companyId') companyId: string) {
    const findByCompanyUC = new FindAllByCompany(this.programService);
    return await findByCompanyUC.execute(companyId);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const findUC = new FindById(this.programService);
    const foundProgram = await findUC.execute(id);
    return foundProgram;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedField: ProgramToUpdateDto,
  ) {
    const updateUC = new Update(this.programService);
    return await updateUC.execute(id, updatedField);
  }

}
