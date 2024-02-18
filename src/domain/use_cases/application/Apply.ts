import { Questions } from 'src/domain/entities/Application';
import { ItemNotCreatedError } from 'src/domain/exceptions/item_not_created_error';
import { IApplicationService } from 'src/domain/ports/iapplication_service';

export class Apply {
  constructor(private readonly service: IApplicationService) {}

  async execute(volunteerId: string, programId: string, questions: Questions) {
    const application = await this.service.volunteerApplyProgram(
      volunteerId,
      programId,
      questions,
    );
    if (!application) {
      throw new ItemNotCreatedError(
        'Não foi possível se inscrever no programa.',
      );
    }
    return application;
  }
}
