import { CreateNivelDTO } from "@infra/http/dto/create-nivel.dto";
import { HttpException } from "@nestjs/common";
import { NiveisRepositoryInMemory } from "../../../../test/in-memory-niveis-repository";
import { CreateNivelUseCase } from "./create-nivel.use-case";

describe("CreateNivelUseCase", () => {
  let createNivelUseCase: CreateNivelUseCase;
  let niveisRepository: NiveisRepositoryInMemory;

  beforeEach(async () => {
    niveisRepository = new NiveisRepositoryInMemory();
    createNivelUseCase = new CreateNivelUseCase(niveisRepository);
  });

  it("should be defined", () => {
    expect(createNivelUseCase).toBeDefined();
  });

  it("should throw error if nivel already exists", async () => {
    const existingNivel = await niveisRepository.createNivel({
      nivel: "Junior",
    });

    try {
      await createNivelUseCase.execute({ nivel: "Junior" });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(401);
    }
  });

  it("should create a new nivel successfully", async () => {
    const nivelData: CreateNivelDTO = { nivel: "Pleno" };

    const newNivel = await createNivelUseCase.execute(nivelData);

    expect(newNivel).toBeDefined();
    expect(newNivel.nivel).toBe(nivelData.nivel);

    const storedNivel = await niveisRepository.getNiveis({ nivel: "Pleno" });
    expect(storedNivel.length).toBe(1);
    expect(storedNivel[0].nivel).toBe("Pleno");
  });
});
