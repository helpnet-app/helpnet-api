import { ProgramStatusEnum } from 'src/domain/entities/enum/program_status_enum';
import { ItemNotUpdatedError } from 'src/domain/exceptions/item_not_updated_error';
import { ICertificateService } from 'src/domain/ports/icertificate_service';
import { IProgramService } from 'src/domain/ports/iprogram_service';
import { IApplicationService } from '../../ports/iapplication_service';

export class Finish {
  constructor(
    private readonly service: IProgramService,
    private readonly applicationService: IApplicationService,
    private readonly certificateService: ICertificateService,
  ) {}
  async execute(id: string) {
    try {
      const updatedApplications =
        await this.applicationService.updateManyByProgramId(
          id,
          'finishedAt',
          new Date(),
        );
      await this.certificateService.createCertificatesFromUpdatedApplications(
        updatedApplications,
      );
      const finishedProgram = await this.service.update(id, {
        status: ProgramStatusEnum.FINISHED,
      });
      if (!finishedProgram) {
        throw new ItemNotUpdatedError('Não foi possível encerrar programa.');
      }
      return finishedProgram;
    } catch (error) {
      throw new ItemNotUpdatedError(error);
    }
  }
}
