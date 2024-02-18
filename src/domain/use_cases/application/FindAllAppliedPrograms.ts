import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IApplicationService } from 'src/domain/ports/iapplication_service';

export class FindAllAppliedPrograms {
  constructor(private readonly service: IApplicationService) {}
  async execute(volunteerId: string) {
    const programs = await this.service.findAllAppliedPrograms(volunteerId);
    if (!programs) {
      throw new ItemNotFoundError(
        'Não foi possível retornar programas aplicados',
      );
    }
    return programs;
  }
}
