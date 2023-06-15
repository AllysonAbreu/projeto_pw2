/*
  Warnings:

  - You are about to drop the column `tipo_midia` on the `midia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "midia" DROP COLUMN "tipo_midia";

-- DropEnum
DROP TYPE "TipoMidia";
