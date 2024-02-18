import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IProgramService } from 'src/domain/ports/iprogram_service';

export class FindById {
  constructor(private readonly service: IProgramService) {}

  async execute(id: string) {
    const foundProgram = await this.service.findById(id);
    if (!foundProgram) {
      throw new ItemNotFoundError('Não foi possível encontrar programa.');
    }
    return foundProgram;
  }
}
