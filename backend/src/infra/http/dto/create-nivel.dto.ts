import { IsDefined, IsString } from "class-validator";

export class CreateNivelDTO {
  @IsDefined()
  @IsString()
  nivel: string;
}
