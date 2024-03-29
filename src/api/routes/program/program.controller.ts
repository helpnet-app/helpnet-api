import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationService } from 'src/api/services/application.service';
import { CertificateService } from 'src/api/services/certificate.service.';
import { ProgramService } from 'src/api/services/program.service';
import { ProgramToCreateDto } from 'src/domain/dtos/program/ProgramToCreateDto';
import { ProgramToUpdateDto } from 'src/domain/dtos/program/ProgramToUpdateDto';
import { Questions } from 'src/domain/entities/Application';
import { Apply } from 'src/domain/use_cases/application/Apply';
import { Approves } from 'src/domain/use_cases/application/Approves';
import { FetchAllApplicationsByProgram } from 'src/domain/use_cases/application/FetchAllApplicationsByProgram';
import { FindAllAppliedPrograms } from 'src/domain/use_cases/application/FindAllAppliedPrograms';
import { FindApplicationByVolunteerId } from 'src/domain/use_cases/application/FindVolunteerById';
import { GiveUp } from 'src/domain/use_cases/application/GiveUp';
import { Reject } from 'src/domain/use_cases/application/Reject';
import { Create } from 'src/domain/use_cases/program/Create';
import { DeleteById } from 'src/domain/use_cases/program/Delete';
import { FetchAll } from 'src/domain/use_cases/program/FetchAll';
import { FindAllByOrganization } from 'src/domain/use_cases/program/FindAllByOrganizationId';
import { FindById } from 'src/domain/use_cases/program/FindById';
import { Finish } from 'src/domain/use_cases/program/Finish';
import { Start } from 'src/domain/use_cases/program/Start';
import { Update } from 'src/domain/use_cases/program/Update';

@Controller('programs')
export class ProgramController {
  constructor(
    private readonly programService: ProgramService,
    private readonly applicationService: ApplicationService,
    private readonly certificateService: CertificateService,
  ) {}

  @Post(':organizationId/create')
  async create(
    @Param('organizationId') organizationId: string,
    @Body() programToCreate: ProgramToCreateDto,
  ) {
    const createUC = new Create(this.programService);
    return await createUC.execute(organizationId, programToCreate);
  }

  @Get() //OK
  async fetchAll() {
    const foundPrograms = new FetchAll(this.programService);
    return await foundPrograms.execute();
  }

  @Get('/organization/:organizationId') // OK
  async findByOrganization(@Param('organizationId') organizationId: string) {
    const findByOrganizationUC = new FindAllByOrganization(this.programService);
    return await findByOrganizationUC.execute(organizationId);
  }

  @Get('/:id') // OK
  async findById(@Param('id') id: string) {
    const findUC = new FindById(this.programService);
    const foundProgram = await findUC.execute(id);
    return foundProgram;
  }

  @Patch(':id') //OK
  async update(
    @Param('id') id: string,
    @Body() updatedField: ProgramToUpdateDto,
  ) {
    const updateUC = new Update(this.programService);
    return await updateUC.execute(id, updatedField);
  }

  @Delete(':id') // OK
  async deleteById(@Param('id') id: string) {
    const deleteUC = new DeleteById(this.programService);
    return await deleteUC.execute(id);
  }

  @Post(':id/start') // Ok
  async startProgram(@Param('id') id: string) {
    const startUC = new Start(this.programService);
    return await startUC.execute(id);
  }

  @Post(':id/finish') // OK
  async finishProgram(@Param('id') id: string) {
    const finishUC = new Finish(
      this.programService,
      this.applicationService,
      this.certificateService,
    );
    return await finishUC.execute(id);
  }

  @Post('/:programId/:volunteerId/apply') // OK
  async apply(
    @Param('programId') programId: string,
    @Param('volunteerId') volunteerId: string,
    @Body() questions: Questions,
  ) {
    const ApplyUC = new Apply(this.applicationService);
    return await ApplyUC.execute(volunteerId, programId, questions);
  }

  // OBS RETORNA TODAS AS APLICAÇÕES DAQUELE PROGRAMA
  @Get(':programId/applications') // OK
  async fetchAllApplicationsByProgram(@Param('programId') programId: string) {
    const fetchUC = new FetchAllApplicationsByProgram(this.applicationService);
    return await fetchUC.execute(programId);
  }

  // OBS  RETORNA TODAS AS APLICAÇÕES DO VOLUNTÁRIO COM INFORMAÇÕES DO PROGRAMA
  @Get('/applied/:volunteerId') // OK
  async findAppliedPrograms(@Param('volunteerId') volunteerId: string) {
    const appliedUC = new FindAllAppliedPrograms(this.applicationService);
    return await appliedUC.execute(volunteerId);
  }

  // OBS RETORNA APLICAÇÃO >>ESPECÍFICA<<  DO VOLUNTÁRIO COM INFORMAÇÕES DO VOLUNTÁRIO
  @Get('/application/:volunteerId') // ?
  async findApplicationVolunteer(@Param('volunteerId') volunteerId: string) {
    const findUC = new FindApplicationByVolunteerId(this.applicationService);
    return await findUC.execute(volunteerId);
  }

  @Delete('/application/:applicationId/giveup') // ?
  async giveUp(@Param('applicationId') applicationId: string) {
    const giveUpUC = new GiveUp(this.applicationService);
    return await giveUpUC.execute(applicationId);
  }

  @Patch('/application/:applicationId/approves') // OK
  async approves(@Param('applicationId') applicationId: string) {
    const approvesUC = new Approves(this.applicationService);
    return approvesUC.execute(applicationId);
  }

  @Patch('/application/:applicationId/reject') // OK
  async reject(@Param('applicationId') applicationId: string) {
    const rejectUC = new Reject(this.applicationService);
    return rejectUC.execute(applicationId);
  }
}
