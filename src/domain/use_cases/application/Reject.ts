import { ApplicationStatusEnum } from 'src/domain/entities/enum/application_status_enum';
import { ItemNotUpdatedError } from 'src/domain/exceptions/item_not_updated_error';
import { IApplicationService } from 'src/domain/ports/iapplication_service';

export class Reject {
  constructor(private readonly service: IApplicationService) {}
  async execute(applicationId: string) {
    const updatedApplication = await this.service.update(applicationId, {
      status: ApplicationStatusEnum.REFUSED,
    });

    if (!updatedApplication)
      throw new ItemNotUpdatedError('Não foi possível rejeitar o candidato.');
    return updatedApplication;
  }
}
