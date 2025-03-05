import { CreateDesenvolvedorDTO } from "@infra/http/dto/create-desenvolvedor.dto";
import { HttpException } from "@nestjs/common";
import { DesenvolvedoresRepositoryInMemory } from "../../../../test/in-memory-desenvolvedores-repository";
import { UpdateDesenvolvedoresUseCase } from "./update-desenvolvedor.use-case";

describe("UpdateDesenvolvedoresUseCase", () => {
  let updateDesenvolvedoresUseCase: UpdateDesenvolvedoresUseCase;
  let desenvolvedoresRepository: DesenvolvedoresRepositoryInMemory;

  beforeEach(async () => {
    desenvolvedoresRepository = new DesenvolvedoresRepositoryInMemory();
    updateDesenvolvedoresUseCase = new UpdateDesenvolvedoresUseCase(
      desenvolvedoresRepository
    );
  });

  it("should be defined", () => {
    expect(updateDesenvolvedoresUseCase).toBeDefined();
  });

  it("should throw error if developer does not exist", async () => {
    try {
      await updateDesenvolvedoresUseCase.execute(999, {
        nome: "Carlos",
        data_nascimento: new Date("1992-02-12"),
        hobby: "Correr",
        nivel_id: 1,
        sexo: "M",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(401);
    }
  });

  it("should update developer successfully", async () => {
    const dev = await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Carlos",
      data_nascimento: "1992-02-12",
      hobby: "Correr",
      nivel_id: 1,
      sexo: "M",
    });

    expect(dev).toBeDefined();

    const updatedData: CreateDesenvolvedorDTO = {
      nome: "Carlos Silva",
      data_nascimento: new Date("1992-02-12"),
      hobby: "Correr e nadar",
      nivel_id: 2,
      sexo: "M",
    };

    const updatedDev = await updateDesenvolvedoresUseCase.execute(
      dev.id,
      updatedData
    );

    expect(updatedDev.nome).toBe(updatedData.nome);
    expect(updatedDev.hobby).toBe(updatedData.hobby);
    expect(updatedDev.nivel_id).toBe(updatedData.nivel_id);
  });
});
