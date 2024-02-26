import { ProgramToCreateDto } from 'src/domain/dtos/program/ProgramToCreateDto';
import { ItemNotCreatedError } from 'src/domain/exceptions/item_not_created_error';
import { IProgramService } from 'src/domain/ports/iprogram_service';

export class Create {
  constructor(private readonly service: IProgramService) {}

  async execute(organizationId: string, newProgram: ProgramToCreateDto) {
    const createdProgram = await this.service.create(
      organizationId,
      newProgram,
    );
    if (!createdProgram) {
      throw new ItemNotCreatedError('Não foi possível criar novo programa.');
    }
    return createdProgram;
  }
}
