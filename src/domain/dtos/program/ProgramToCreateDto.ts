import { ModeEnum } from 'src/domain/entities/enum/mode_enum';

export interface ProgramToCreateDto {
  title: string;
  mode: ModeEnum;
  duration: number;
  description: string;
  type: string;
  nSpots: number;
  tags: string[];
}
