import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IProgramService } from 'src/domain/ports/iprogram_service';

export class FetchAll {
  constructor(private readonly service: IProgramService) {}

  async execute() {
    try {
      const programs = this.service.fetchAll();
      return programs;
    } catch (error) {
      throw new ItemNotFoundError(
        'Não foi possível encontrar programas de voluntariado.',
      );
    }
  }
}
