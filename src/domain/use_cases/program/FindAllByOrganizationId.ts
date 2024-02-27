import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IProgramService } from 'src/domain/ports/iprogram_service';

export class FindAllByOrganization {
  constructor(private readonly service: IProgramService) {}

  async execute(organizationId: string) {
    const programs = await this.service.findAllByOrganizationId(organizationId);
    if (!programs) {
      throw new ItemNotFoundError(
        'Não foi possível encontrar programas de voluntariado relacionados à Organização',
      );
    }
    return programs;
  }
}
