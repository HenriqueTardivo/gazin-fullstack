import { DefaultPage } from "../../components/default-page";
import { PageHeader } from "../../components/page-header";

export function Niveis() {
  return (
    <DefaultPage>
      <PageHeader
        addText="Cadastrar nível"
        searchText="Pesquise níveis"
        newItemRoute="/niveis/new"
      />
    </DefaultPage>
  );
}
