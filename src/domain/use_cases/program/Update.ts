import { ProgramToUpdateDto } from 'src/domain/dtos/program/ProgramToUpdateDto';
import { ItemNotUpdatedError } from 'src/domain/exceptions/item_not_updated_error';
import { IProgramService } from 'src/domain/ports/iprogram_service';

export class Update {
  constructor(private readonly service: IProgramService) {}

  async execute(id: string, updatedFields: ProgramToUpdateDto) {
    const updatedProgram = await this.service.update(id, updatedFields);
    if (!updatedProgram) {
      throw new ItemNotUpdatedError(
        'Não foi possível atualizar informações do programa.',
      );
    }
    return updatedProgram;
  }
}
