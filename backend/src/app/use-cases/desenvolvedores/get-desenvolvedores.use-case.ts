import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { paginatedResult } from "@app/utils/paginated-result";
import { QueryDesenvolvedorDTO } from "@infra/http/dto/query-desenvolvedores.dto";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class GetDesenvolvedoresUseCase {
  constructor(
    private readonly desenvolvedoresRepository: DesenvolvedorRepository
  ) {}

  public async execute(filter: QueryDesenvolvedorDTO) {
    if (filter.page < 0) {
      throw new HttpException("Página não pode ser menor que 0", 401);
    }

    const { result, count } =
      await this.desenvolvedoresRepository.getDesenvolvedoresPaginated({
        page: Number(filter.page),
        nivel_id: filter?.nivel_id,
        search: filter?.search,
      });

    return paginatedResult(result, filter.page, count);
  }
}
