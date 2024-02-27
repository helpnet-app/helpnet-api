import { ModeEnum } from 'src/domain/entities/enum/mode_enum';

export class ProgramToCreateDto {
  title: string;
  mode: ModeEnum;
  duration: number;
  description: string;
  type: string;
  nSpots: number;
  tags: string[];
  pictureLink: string; // Use UploadedFile type from @nestjs/common
}
