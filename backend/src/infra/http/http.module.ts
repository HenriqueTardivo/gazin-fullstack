import { CreateDesenvolvedorUseCase } from "@app/use-cases/desenvolvedores/create-desenvolvedor.use-case";
import { DeleteDesenvolvedorUseCase } from "@app/use-cases/desenvolvedores/delete-desenvolvedor.use-case";
import { GetDesenvolvedoresUseCase } from "@app/use-cases/desenvolvedores/get-desenvolvedores.use-case";
import { UpdateDesenvolvedoresUseCase } from "@app/use-cases/desenvolvedores/update-desenvolvedor.use-case";
import { CreateNivelUseCase } from "@app/use-cases/niveis/create-nivel.use-case";
import { DeleteNivelUseCase } from "@app/use-cases/niveis/delete-nivel.use-case";
import { GetNiveisUseCase } from "@app/use-cases/niveis/get-niveis.use-case";
import { UpdateNivelUseCase } from "@app/use-cases/niveis/update-nivel.use-case";
import { Module } from "@nestjs/common";
import { DesenvolvedoresController } from "./controllers/desenvolvedores.controller";
import { NiveisController } from "./controllers/niveis.controller";
import { DatabaseModule } from "@infra/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [DesenvolvedoresController, NiveisController],
  providers: [
    CreateDesenvolvedorUseCase,
    DeleteDesenvolvedorUseCase,
    GetDesenvolvedoresUseCase,
    UpdateDesenvolvedoresUseCase,
    CreateNivelUseCase,
    DeleteNivelUseCase,
    GetNiveisUseCase,
    UpdateNivelUseCase,
  ],
})
export class HttpModule {}
