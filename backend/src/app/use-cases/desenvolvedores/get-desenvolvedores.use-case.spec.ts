import { QueryDesenvolvedorDTO } from "@infra/http/dto/query-desenvolvedores.dto";
import { HttpException } from "@nestjs/common";
import { GetDesenvolvedoresUseCase } from "./get-desenvolvedores.use-case";
import { DesenvolvedoresRepositoryInMemory } from "../../../../test/in-memory-desenvolvedores-repository";

describe("GetDesenvolvedoresUseCase", () => {
  let getDesenvolvedoresUseCase: GetDesenvolvedoresUseCase;
  let desenvolvedoresRepository: DesenvolvedoresRepositoryInMemory;

  beforeEach(async () => {
    desenvolvedoresRepository = new DesenvolvedoresRepositoryInMemory();
    getDesenvolvedoresUseCase = new GetDesenvolvedoresUseCase(
      desenvolvedoresRepository
    );
  });

  it("should be defined", () => {
    expect(getDesenvolvedoresUseCase).toBeDefined();
  });

  it("should throw an error if the page is less than 0", async () => {
    const filter: QueryDesenvolvedorDTO = { page: -1, sort: "nome" };

    try {
      await getDesenvolvedoresUseCase.execute(filter);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(401);
    }
  });

  it("should return paginated desenvolvedores when page is valid", async () => {
    await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Lucas",
      nivel_id: 1,
    });
    await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Ana",
      nivel_id: 2,
    });
    await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Carlos",
      nivel_id: 1,
    });

    const filter: QueryDesenvolvedorDTO = { page: 1, sort: "nome" };
    const result = await getDesenvolvedoresUseCase.execute(filter);

    expect(result).toBeDefined();
    expect(result.data.length).toBe(3);
    expect(result.meta.current_page).toBe(1);
    expect(result.meta.total).toBe(3);
  });

  it("should return paginated desenvolvedores with filter by nivel_id", async () => {
    await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Lucas",
      nivel_id: 1,
    });
    await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Ana",
      nivel_id: 2,
    });
    await desenvolvedoresRepository.createDesenvolvedor({
      nome: "Carlos",
      nivel_id: 1,
    });

    const filter: QueryDesenvolvedorDTO = {
      page: 1,
      nivel_id: 1,
      sort: "nome",
    };
    const result = await getDesenvolvedoresUseCase.execute(filter);

    expect(result).toBeDefined();
    expect(result.data.length).toBe(2);
    expect(result.meta.current_page).toBe(1);
    expect(result.meta.total).toBe(2);
  });

  it("should return an empty array if no desenvolvedores found", async () => {
    const filter: QueryDesenvolvedorDTO = { page: 1, sort: "nome" };
    const result = await getDesenvolvedoresUseCase.execute(filter);

    expect(result).toBeDefined();
    expect(result.data).toEqual([]);
    expect(result.meta.current_page).toBe(1);
    expect(result.meta.total).toBe(0);
  });
});
