import { IsDefined, IsNumberString, Validate } from "class-validator";

export class IdParamDTO {
  @IsNumberString()
  @IsDefined()
  @Validate((n: string) => Number(n) > 0)
  id: string;
}
