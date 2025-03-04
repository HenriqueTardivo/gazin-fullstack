import {
  IsDateString,
  IsDefined,
  IsIn,
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateDesenvolvedorDTO {
  @IsDefined()
  @IsNumber()
  nivel_id: number;

  @IsDefined()
  @IsString()
  @MaxLength(250)
  nome: string;

  @IsDefined()
  @IsIn(["M", "F"])
  sexo: string;

  @IsDefined()
  @IsDateString()
  data_nascimento: Date;

  @IsDefined()
  @MaxLength(250)
  hobby: string;
}
