import { CreateNivelUseCase } from "@app/use-cases/niveis/create-nivel.use-case";
import { DeleteNivelUseCase } from "@app/use-cases/niveis/delete-nivel.use-case";
import { GetNiveisUseCase } from "@app/use-cases/niveis/get-niveis.use-case";
import { UpdateNivelUseCase } from "@app/use-cases/niveis/update-nivel.use-case";
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
import { QueryNiveisDTO } from "../dto/query-niveis.dto";
import { CreateNivelDTO } from "../dto/create-nivel.dto";

@Controller("/api/niveis")
export class NiveisController {
  constructor(
    private readonly getNiveisUseCase: GetNiveisUseCase,
    private readonly createNivelUseCase: CreateNivelUseCase,
    private readonly updateNivelUseCase: UpdateNivelUseCase,
    private readonly deleteNivelUseCase: DeleteNivelUseCase
  ) {}

  @Get("/")
  public async getNiveis(@Query() query: QueryNiveisDTO) {
    return this.getNiveisUseCase.execute(query);
  }

  @Delete("/:id")
  public async deleteNivel(@Param("id") id: string) {
    return this.deleteNivelUseCase.execute(Number(id));
  }

  @Post("/")
  public async createNivel(@Body() body: CreateNivelDTO) {
    return this.createNivelUseCase.execute(body);
  }

  @Put("/:id")
  @Patch("/:id")
  public async editNivel(
    @Param("id") id: string,
    @Body() body: CreateNivelDTO
  ) {
    return this.updateNivelUseCase.execute(Number(id), body);
  }
}
