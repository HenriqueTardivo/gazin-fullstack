import { CreateNivelUseCase } from "@app/use-cases/niveis/create-nivel.use-case";
import { DeleteNivelUseCase } from "@app/use-cases/niveis/delete-nivel.use-case";
import { GetNiveisUseCase } from "@app/use-cases/niveis/get-niveis.use-case";
import { UpdateNivelUseCase } from "@app/use-cases/niveis/update-nivel.use-case";
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
import { QueryNiveisDTO } from "../dto/query-niveis.dto";
import { CreateNivelDTO } from "../dto/create-nivel.dto";
import { IdParamDTO } from "../dto/id-param.dto";
import { GetNivelByIdUseCase } from "@app/use-cases/niveis/get-nivel-by-id.use-case";

@Controller("/api/niveis")
export class NiveisController {
  constructor(
    private readonly getNiveisUseCase: GetNiveisUseCase,
    private readonly getNivelByIdUseCase: GetNivelByIdUseCase,
    private readonly createNivelUseCase: CreateNivelUseCase,
    private readonly updateNivelUseCase: UpdateNivelUseCase,
    private readonly deleteNivelUseCase: DeleteNivelUseCase
  ) {}

  @Get("/")
  @HttpCode(200)
  public async getNiveis(@Query() query: QueryNiveisDTO) {
    return this.getNiveisUseCase.execute(query);
  }

  @Get("/:id")
  @HttpCode(201)
  public async getNivelById(@Param() { id }: IdParamDTO) {
    return this.getNivelByIdUseCase.execute(Number(id));
  }

  @Delete("/:id")
  @HttpCode(204)
  public async deleteNivel(@Param() { id }: IdParamDTO) {
    return this.deleteNivelUseCase.execute(Number(id));
  }

  @Post("/")
  public async createNivel(@Body() body: CreateNivelDTO) {
    return this.createNivelUseCase.execute(body);
  }

  @Put("/:id")
  @Patch("/:id")
  @HttpCode(200)
  public async editNivel(
    @Param() { id }: IdParamDTO,
    @Body() body: CreateNivelDTO
  ) {
    return this.updateNivelUseCase.execute(Number(id), body);
  }
}
