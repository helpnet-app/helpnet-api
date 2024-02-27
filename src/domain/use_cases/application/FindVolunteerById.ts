import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IApplicationService } from 'src/domain/ports/iapplication_service';

export class FindApplicationByVolunteerId {
  constructor(private readonly service: IApplicationService) {}

  async execute(volunteerId: string) {
    const foundApplication =
      await this.service.findApplicationByVolunteerId(volunteerId);
    if (!foundApplication)
      throw new ItemNotFoundError(
        'Não foi possível acessar informações do candidato',
      );
    return foundApplication;
  }
}
