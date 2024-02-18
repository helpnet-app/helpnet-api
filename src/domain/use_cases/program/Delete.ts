import { ProgramStatusEnum } from 'src/domain/entities/enum/program_status_enum';
import { ItemNotDeletedError } from 'src/domain/exceptions/item_not_deleted_error';
import { IProgramService } from 'src/domain/ports/iprogram_service';

export class DeleteById {
  constructor(private readonly service: IProgramService) {}
  async execute(id: string) {
    const foundProgram = await this.service.findById(id);
    if (foundProgram.status == ProgramStatusEnum.ON_GOING) {
      throw new ItemNotDeletedError(
        'Não é possível excluir programa em andamento.',
      );
    }
    const deletedProgram = await this.service.deleteById(id);
    if (!deletedProgram) {
      throw new ItemNotDeletedError('Não foi possível excluir programa.');
    }
    return deletedProgram;
  }
}
