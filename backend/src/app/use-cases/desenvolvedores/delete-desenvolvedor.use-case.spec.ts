import { HttpException } from "@nestjs/common";
import { DesenvolvedoresRepositoryInMemory } from "../../../../test/in-memory-desenvolvedores-repository";
import { DeleteDesenvolvedorUseCase } from "./delete-desenvolvedor.use-case";

describe("DeleteDesenvolvedorUseCase", () => {
  let deleteDesenvolvedorUseCase: DeleteDesenvolvedorUseCase;
  let desenvolvedoresRepository: DesenvolvedoresRepositoryInMemory;

  beforeEach(async () => {
    desenvolvedoresRepository = new DesenvolvedoresRepositoryInMemory();
    deleteDesenvolvedorUseCase = new DeleteDesenvolvedorUseCase(
      desenvolvedoresRepository
    );
  });

  it("should be defined", () => {
    expect(deleteDesenvolvedorUseCase).toBeDefined();
  });

  it("should throw error if developer does not exist", async () => {
    try {
      await deleteDesenvolvedorUseCase.execute(999);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(401);
    }
  });

  it("should delete the developer successfully", async () => {
    const dev = await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Carlos",
      data_nascimento: "1992-02-12",
      hobby: "Correr",
      nivel_id: 1,
      sexo: "M",
    });

    expect(dev).toBeDefined();
    const result = await deleteDesenvolvedorUseCase.execute(dev.id);
    expect(result).toBeUndefined();
  });
});
