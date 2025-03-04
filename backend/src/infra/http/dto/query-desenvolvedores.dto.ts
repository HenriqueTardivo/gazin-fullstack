import { IsDefined, IsNumberString, IsOptional } from "class-validator";

export class QueryDesenvolvedorDTO {
  @IsNumberString()
  @IsDefined()
  page: number;

  @IsNumberString()
  @IsOptional()
  nivel_id: number;

  @IsOptional()
  search: string;
}
