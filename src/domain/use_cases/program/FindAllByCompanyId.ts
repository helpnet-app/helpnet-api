import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IProgramService } from 'src/domain/ports/iprogram_service';

export class FindAllByCompany {
  constructor(private readonly service: IProgramService) {}

  async execute(companyId: string) {
    const programs = await this.service.findAllByCompanyId(companyId);
    if (!programs) {
      throw new ItemNotFoundError(
        'Não foi possível encontrar programas de voluntariado relacionados à Organização',
      );
    }
    return programs;
  }
}
