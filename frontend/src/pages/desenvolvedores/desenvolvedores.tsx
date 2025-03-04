import { DefaultPage } from "../../components/default-page";
import { PageHeader } from "../../components/page-header";

export function Desenvolvedores() {
  return (
    <DefaultPage>
      <PageHeader
        addText="Cadastrar desenvolvedor"
        searchText="Pesquise desenvolvedores"
        newItemRoute="/desenvolvedores/new"
      />
    </DefaultPage>
  );
}
