import { IsDefined, IsNumberString, IsOptional } from "class-validator";

export class QueryDesenvolvedorDTO {
  @IsNumberString()
  @IsDefined()
  page: number;

  @IsOptional()
  nivel_id?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  sort?: string;
}
