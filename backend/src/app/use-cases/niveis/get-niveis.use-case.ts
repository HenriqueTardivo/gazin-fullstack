import { NiveisRepository } from "@app/repositories/niveis.repository";
import { paginatedResult } from "@app/utils/paginated-result";
import { QueryNiveisDTO } from "@infra/http/dto/query-niveis.dto";
import { HttpException, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetNiveisUseCase {
  constructor(private readonly nivelRespository: NiveisRepository) {}

  public async execute(filter: QueryNiveisDTO) {
    if (!filter.page || filter?.page <= 0) {
      throw new HttpException("Página não pode ser menor que 0", 401);
    }

    const { result, count } = await this.nivelRespository.getNiveisPaginated({
      page: filter.page,
      search: filter?.search,
      sort: filter.sort,
    });

    if (count === 0) {
      throw new NotFoundException("Nenhum nível encontrado");
    }

    return paginatedResult(result, filter.page, count);
  }
}
