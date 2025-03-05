/**
 *
 * @param result Array de resultado da pagina
 * @param page Pagina atual
 * @param count Total de itens
 * @param page_size Tamanho da pagina
 * @returns
 */
export function paginatedResult(
  result: any[], // Aceita qualquer array
  page: number,
  count: number,
  page_size: number = 10
) {
  return {
    data: result,
    meta: {
      total: count,
      per_page: page_size,
      current_page: Number(page),
      last_page: count > 0 ? Math.ceil(count / page_size) : 1,
    },
  };
}
