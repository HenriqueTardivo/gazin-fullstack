import { QueryNiveisDTO } from "@infra/http/dto/query-niveis.dto";
import { HttpException } from "@nestjs/common";
import { NiveisRepositoryInMemory } from "../../../../test/in-memory-niveis-repository";
import { GetNiveisUseCase } from "./get-niveis.use-case";

describe("GetNiveisUseCase", () => {
  let getNiveisUseCase: GetNiveisUseCase;
  let niveisRepository: NiveisRepositoryInMemory;

  beforeEach(async () => {
    niveisRepository = new NiveisRepositoryInMemory();
    getNiveisUseCase = new GetNiveisUseCase(niveisRepository);
  });

  it("should be defined", () => {
    expect(getNiveisUseCase).toBeDefined();
  });

  it("should throw an error if the page is less than 0", async () => {
    const filter: QueryNiveisDTO = {
      page: -1,
      nivel_id: 1,
      search: "",
    };

    try {
      await getNiveisUseCase.execute(filter);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(401);
    }
  });

  it("should return paginated niveis when page is valid", async () => {
    await niveisRepository.createNivel({ nivel: "Junior" });
    await niveisRepository.createNivel({ nivel: "Pleno" });
    await niveisRepository.createNivel({ nivel: "Senior" });

    const filter: QueryNiveisDTO = { page: 1, sort: "nivel" };
    const result = await getNiveisUseCase.execute(filter);

    expect(result).toBeDefined();
    expect(result.data.length).toBe(3);
    expect(result.meta.current_page).toBe(1);
    expect(result.meta.total).toBe(3);
  });

  it("should return an empty array if no niveis found", async () => {
    const filter: QueryNiveisDTO = { page: 1, sort: "nivel" };
    const result = await getNiveisUseCase.execute(filter);

    expect(result).toBeDefined();
    expect(result.data).toEqual([]);
    expect(result.meta.current_page).toBe(1);
    expect(result.meta.total).toBe(0);
  });
});
