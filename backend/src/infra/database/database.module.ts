import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { DesenvolvedorRepository } from "@app/repositories/desenvolvedores.respository";
import { DesenvolvedoresRepositoryPrisma } from "./prisma/repositories/desenvolvedor-prisma.repository";
import { NiveisRepository } from "@app/repositories/niveis.repository";
import { NiveisRepositoryPrisma } from "./prisma/repositories/nivel-prisma.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: DesenvolvedorRepository,
      useClass: DesenvolvedoresRepositoryPrisma,
    },
    {
      provide: NiveisRepository,
      useClass: NiveisRepositoryPrisma,
    },
  ],
  exports: [NiveisRepository, DesenvolvedorRepository],
})
export class DatabaseModule {}
