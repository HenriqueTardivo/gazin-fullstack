import { IsDefined, IsNumberString, IsOptional } from "class-validator";

export class QueryNiveisDTO {
  @IsNumberString()
  @IsDefined()
  page: number;

  @IsNumberString()
  @IsOptional()
  nivel_id?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  sort?: string;
}
