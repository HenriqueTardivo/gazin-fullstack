import { HttpException } from "@nestjs/common";
import { DesenvolvedoresRepositoryInMemory } from "../../../../test/in-memory-desenvolvedores-repository";
import { GetDesenvolvedorByIdUseCase } from "./get-desenvolvedor-by-id.use-case";

describe("GetDesenvolvedorByIdUseCase", () => {
  let getDesenvolvedorByIdUseCase: GetDesenvolvedorByIdUseCase;
  let desenvolvedoresRepository: DesenvolvedoresRepositoryInMemory;

  beforeEach(async () => {
    desenvolvedoresRepository = new DesenvolvedoresRepositoryInMemory();
    getDesenvolvedorByIdUseCase = new GetDesenvolvedorByIdUseCase(
      desenvolvedoresRepository
    );
  });

  it("should be defined", () => {
    expect(getDesenvolvedorByIdUseCase).toBeDefined();
  });

  it("should throw error if developer does not exist", async () => {
    try {
      await getDesenvolvedorByIdUseCase.execute(999);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response.message).toBe("Desenvolvedor não encontrado!");
      expect(error.getStatus()).toBe(404);
    }
  });

  it("should return the developer by id", async () => {
    const dev = await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Carlos",
      data_nascimento: "1992-02-12",
      hobby: "Correr",
      nivel_id: 1,
      sexo: "M",
    });

    expect(dev).toBeDefined();

    const result = (await getDesenvolvedorByIdUseCase.execute(dev.id)) as any;
    console.log(result);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(dev.id);
    expect(result[0].nome).toBe(dev.nome);
  });
});
