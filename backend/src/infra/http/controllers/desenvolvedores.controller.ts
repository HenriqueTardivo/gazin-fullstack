import { CreateDesenvolvedorUseCase } from "@app/use-cases/desenvolvedores/create-desenvolvedor.use-case";
import { DeleteDesenvolvedorUseCase } from "@app/use-cases/desenvolvedores/delete-desenvolvedor.use-case";
import { GetDesenvolvedoresUseCase } from "@app/use-cases/desenvolvedores/get-desenvolvedores.use-case";
import { UpdateDesenvolvedoresUseCase } from "@app/use-cases/desenvolvedores/update-desenvolvedor.use-case";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { QueryDesenvolvedorDTO } from "../dto/query-desenvolvedores.dto";
import { CreateDesenvolvedorDTO } from "../dto/create-desenvolvedor.dto";

@Controller("/api/desenvolvedores")
export class DesenvolvedoresController {
  constructor(
    private readonly getDesenvolvedoresUseCase: GetDesenvolvedoresUseCase,
    private readonly createDesenvolvedoresUseCase: CreateDesenvolvedorUseCase,
    private readonly updateDesenvolvedoresUseCase: UpdateDesenvolvedoresUseCase,
    private readonly deleteDesenvolvedoresUseCase: DeleteDesenvolvedorUseCase
  ) {}

  @Get("/")
  public async getDesenvolvedores(@Query() query: QueryDesenvolvedorDTO) {
    return this.getDesenvolvedoresUseCase.execute(query);
  }

  @Delete("/:id")
  public async deleteDesenvolvedor(@Param("id") id: string) {
    return await this.deleteDesenvolvedoresUseCase.execute(Number(id));
  }

  @Post("/")
  public async createDesenvolvedor(@Body() body: CreateDesenvolvedorDTO) {
    return await this.createDesenvolvedoresUseCase.execute(body);
  }

  @Put("/:id")
  @Patch("/:id")
  public async editDesenvolvedor(
    @Param("id") id: string,
    @Body() body: CreateDesenvolvedorDTO
  ) {
    return await this.updateDesenvolvedoresUseCase.execute(Number(id), body);
  }
}
