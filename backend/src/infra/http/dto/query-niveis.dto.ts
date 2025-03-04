import { Transform } from "class-transformer";
import { IsDefined, IsNumberString, IsOptional, Min } from "class-validator";

export class QueryNiveisDTO {
  @IsNumberString()
  @IsDefined()
  page: number;

  @IsNumberString()
  @IsOptional()
  nivel_id: number;

  @IsOptional()
  search: string;
}
