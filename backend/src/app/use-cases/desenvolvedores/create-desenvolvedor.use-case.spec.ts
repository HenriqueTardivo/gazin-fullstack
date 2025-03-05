import { CreateDesenvolvedorDTO } from "@infra/http/dto/create-desenvolvedor.dto";
import { HttpException } from "@nestjs/common";
import { DesenvolvedoresRepositoryInMemory } from "../../../../test/in-memory-desenvolvedores-repository";
import { NiveisRepositoryInMemory } from "../../../../test/in-memory-niveis-repository";
import { CreateDesenvolvedorUseCase } from "./create-desenvolvedor.use-case";

describe("CreateDesenvolvedorUseCase", () => {
  let createDesenvolvedorUseCase: CreateDesenvolvedorUseCase;
  let desenvolvedoresRepository: DesenvolvedoresRepositoryInMemory;
  let niveisRepository: NiveisRepositoryInMemory;

  beforeEach(async () => {
    desenvolvedoresRepository = new DesenvolvedoresRepositoryInMemory();
    niveisRepository = new NiveisRepositoryInMemory();
    createDesenvolvedorUseCase = new CreateDesenvolvedorUseCase(
      niveisRepository,
      desenvolvedoresRepository
    );
  });

  it("should be defined", () => {
    expect(createDesenvolvedorUseCase).toBeDefined();
  });

  it("should throw error if the nivel does not exist", async () => {
    const newDev: CreateDesenvolvedorDTO = {
      nome: "João",
      data_nascimento: new Date("1990-05-15"),
      hobby: "Futebol",
      nivel_id: 999,
      sexo: "M",
    };

    try {
      await createDesenvolvedorUseCase.execute(newDev);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(401);
    }
  });

  it("should throw error if a developer with the same name already exists", async () => {
    const nivel = await niveisRepository.createNivel({ nivel: "Júnior" });

    const dev1: CreateDesenvolvedorDTO = {
      nome: "João",
      data_nascimento: new Date("1990-05-15"),
      hobby: "Futebol",
      nivel_id: nivel.id,
      sexo: "M",
    };
    await createDesenvolvedorUseCase.execute(dev1);

    const dev2: CreateDesenvolvedorDTO = {
      nome: "João",
      data_nascimento: new Date("1992-07-20"),
      hobby: "Leitura",
      nivel_id: nivel.id,
      sexo: "M",
    };

    try {
      await createDesenvolvedorUseCase.execute(dev2);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(401);
    }
  });

  it("should create a new developer successfully", async () => {
    const nivel = await niveisRepository.createNivel({ nivel: "Júnior" });

    const newDev: CreateDesenvolvedorDTO = {
      nome: "Carlos",
      data_nascimento: new Date("1992-02-12"),
      hobby: "Correr",
      nivel_id: nivel.id,
      sexo: "M",
    };

    const createdDev = await createDesenvolvedorUseCase.execute(newDev);

    expect(createdDev).toBeDefined();
    expect(createdDev.nome).toBe(newDev.nome);
    expect(createdDev.hobby).toBe(newDev.hobby);
    expect(createdDev.nivel_id).toBe(newDev.nivel_id);
  });
});
