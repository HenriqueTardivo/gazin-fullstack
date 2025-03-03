-- CreateTable
CREATE TABLE "Niveis" (
    "id" SERIAL NOT NULL,
    "nivel" TEXT NOT NULL,

    CONSTRAINT "Niveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desenvolvedores" (
    "id" SERIAL NOT NULL,
    "nivel_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "hobby" TEXT NOT NULL,

    CONSTRAINT "Desenvolvedores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Desenvolvedores" ADD CONSTRAINT "Desenvolvedores_nivel_id_fkey" FOREIGN KEY ("nivel_id") REFERENCES "Niveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
