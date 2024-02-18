import { ProgramStatusEnum } from 'src/domain/entities/enum/program_status_enum';
import { ItemNotUpdatedError } from 'src/domain/exceptions/item_not_updated_error';
import { IProgramService } from 'src/domain/ports/iprogram_service';

export class Start {
  constructor(private readonly service: IProgramService) {}
  async execute(id: string) {
    const startedProgram = await this.service.update(id, {
      status: ProgramStatusEnum.ON_GOING,
    });
    if (!startedProgram) {
      throw new ItemNotUpdatedError('Não foi possível iniciar programa.');
    }
    return startedProgram;
  }
}
