import { IsDefined, IsString, MaxLength } from "class-validator";

export class CreateNivelDTO {
  @IsDefined()
  @IsString()
  @MaxLength(250)
  nivel: string;
}
