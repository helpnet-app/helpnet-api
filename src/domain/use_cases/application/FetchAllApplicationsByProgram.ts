import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IApplicationService } from 'src/domain/ports/iapplication_service';

export class FetchAllApplicationsByProgram {
  constructor(private readonly service: IApplicationService) {}

  async execute(programId: string) {
    const applications =
      await this.service.fetchAllVolunteerApplicationByProgram(programId);
    if (!applications) {
      throw new ItemNotFoundError('Erro ao carregar lista de candidatos');
    }
    return applications;
  }
}
