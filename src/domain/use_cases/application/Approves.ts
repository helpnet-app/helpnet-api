import { ApplicationStatusEnum } from 'src/domain/entities/enum/application_status_enum';
import { ItemNotUpdatedError } from 'src/domain/exceptions/item_not_updated_error';
import { IApplicationService } from 'src/domain/ports/iapplication_service';

export class Approves {
  constructor(private readonly service: IApplicationService) {}
  async execute(applicationId: string) {
    const updatedApplication = await this.service.update(applicationId, {
      status: ApplicationStatusEnum.APPROVED,
    });

    if (!updatedApplication)
      throw new ItemNotUpdatedError('Não foi possível aprovar o candidato.');
    return updatedApplication;
  }
}
