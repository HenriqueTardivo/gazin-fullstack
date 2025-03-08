import { CreateDesenvolvedorUseCase } from "@app/use-cases/desenvolvedores/create-desenvolvedor.use-case";
import { DeleteDesenvolvedorUseCase } from "@app/use-cases/desenvolvedores/delete-desenvolvedor.use-case";
import { GetDesenvolvedoresUseCase } from "@app/use-cases/desenvolvedores/get-desenvolvedores.use-case";
import { UpdateDesenvolvedoresUseCase } from "@app/use-cases/desenvolvedores/update-desenvolvedor.use-case";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { QueryDesenvolvedorDTO } from "../dto/query-desenvolvedores.dto";
import { CreateDesenvolvedorDTO } from "../dto/create-desenvolvedor.dto";
import { IdParamDTO } from "../dto/id-param.dto";
import { GetDesenvolvedorByIdUseCase } from "@app/use-cases/desenvolvedores/get-desenvolvedor-by-id.use-case";

@Controller("/api/desenvolvedores")
export class DesenvolvedoresController {
  constructor(
    private readonly getDesenvolvedoresUseCase: GetDesenvolvedoresUseCase,
    private readonly getDesenvolvedoresByIdUseCase: GetDesenvolvedorByIdUseCase,
    private readonly createDesenvolvedoresUseCase: CreateDesenvolvedorUseCase,
    private readonly updateDesenvolvedoresUseCase: UpdateDesenvolvedoresUseCase,
    private readonly deleteDesenvolvedoresUseCase: DeleteDesenvolvedorUseCase
  ) {}

  @Get("/")
  @HttpCode(200)
  public async getDesenvolvedores(@Query() query: QueryDesenvolvedorDTO) {
    return this.getDesenvolvedoresUseCase.execute(query);
  }

  @Get("/:id")
  @HttpCode(200)
  public async getDesenvolvedorById(@Param() { id }: IdParamDTO) {
    return this.getDesenvolvedoresByIdUseCase.execute(Number(id));
  }

  @Delete("/:id")
  @HttpCode(204)
  public async deleteDesenvolvedor(@Param() { id }: IdParamDTO) {
    return await this.deleteDesenvolvedoresUseCase.execute(Number(id));
  }

  @Post("/")
  @HttpCode(201)
  public async createDesenvolvedor(@Body() body: CreateDesenvolvedorDTO) {
    return await this.createDesenvolvedoresUseCase.execute(body);
  }

  @Put("/:id")
  @Patch("/:id")
  @HttpCode(200)
  public async editDesenvolvedor(
    @Param() { id }: IdParamDTO,
    @Body() body: CreateDesenvolvedorDTO
  ) {
    return await this.updateDesenvolvedoresUseCase.execute(Number(id), body);
  }
}
