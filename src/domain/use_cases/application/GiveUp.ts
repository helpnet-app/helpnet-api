import { ItemNotDeletedError } from 'src/domain/exceptions/item_not_deleted_error';
import { IApplicationService } from 'src/domain/ports/iapplication_service';

export class GiveUp {
  constructor(private readonly service: IApplicationService) {}

  async execute(applicationId: string) {
    const deletedApplication = await this.service.delete(applicationId);
    if (!deletedApplication)
      throw new ItemNotDeletedError('Não foi possível desistir do programa.');
    return deletedApplication;
  }
}
