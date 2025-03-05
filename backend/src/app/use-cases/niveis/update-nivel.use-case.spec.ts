import { CreateNivelDTO } from "@infra/http/dto/create-nivel.dto";
import { HttpException } from "@nestjs/common";
import { NiveisRepositoryInMemory } from "../../../../test/in-memory-niveis-repository";
import { UpdateNivelUseCase } from "./update-nivel.use-case";

describe("UpdateNivelUseCase", () => {
  let updateNivelUseCase: UpdateNivelUseCase;
  let niveisRepository: NiveisRepositoryInMemory;

  beforeEach(async () => {
    niveisRepository = new NiveisRepositoryInMemory();
    updateNivelUseCase = new UpdateNivelUseCase(niveisRepository);
  });

  it("should be defined", () => {
    expect(updateNivelUseCase).toBeDefined();
  });

  it("should throw an error if the nivel does not exist", async () => {
    const filter: CreateNivelDTO = { nivel: "Junior" };

    try {
      await updateNivelUseCase.execute(1, filter);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(401);
    }
  });

  it("should update the nivel if it exists", async () => {
    const createFilter: CreateNivelDTO = { nivel: "Junior" };
    const createdNivel = await niveisRepository.createNivel(createFilter);

    const updatedFilter: CreateNivelDTO = { nivel: "Pleno" };

    const result = await updateNivelUseCase.execute(
      createdNivel.id,
      updatedFilter
    );

    expect(result).toBeDefined();
    expect(result.nivel).toBe("Pleno");
  });
});
