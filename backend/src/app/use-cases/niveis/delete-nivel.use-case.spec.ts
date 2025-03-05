import { HttpException } from "@nestjs/common";
import { DesenvolvedoresRepositoryInMemory } from "../../../../test/in-memory-desenvolvedores-repository";
import { NiveisRepositoryInMemory } from "../../../../test/in-memory-niveis-repository";
import { DeleteNivelUseCase } from "./delete-nivel.use-case";

describe("DeleteNivelUseCase", () => {
  let deleteNivelUseCase: DeleteNivelUseCase;
  let niveisRepository: NiveisRepositoryInMemory;
  let desenvolvedoresRepository: DesenvolvedoresRepositoryInMemory;

  beforeEach(async () => {
    desenvolvedoresRepository = new DesenvolvedoresRepositoryInMemory();
    niveisRepository = new NiveisRepositoryInMemory();
    deleteNivelUseCase = new DeleteNivelUseCase(
      niveisRepository,
      desenvolvedoresRepository
    );
  });

  it("should be defined", () => {
    expect(deleteNivelUseCase).toBeDefined();
  });

  it("should throw an error if there are developers in the nivel", async () => {
    const nivel = await niveisRepository.createNivel({ nivel: "Junior" });
    await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Dev Teste",
      sexo: "M",
      data_nascimento: "1990-01-01",
      hobby: "Coding",
      nivel_id: nivel.id,
    });

    try {
      await deleteNivelUseCase.execute(nivel.id);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(401);
    }
  });

  it("should delete a nivel successfully when no developers are associated", async () => {
    const nivel = await niveisRepository.createNivel({ nivel: "Pleno" });

    await deleteNivelUseCase.execute(nivel.id);

    const nivelAfterDelete = await niveisRepository.getNiveis({ id: nivel.id });
    expect(nivelAfterDelete.length).toBe(0);
  });
});
