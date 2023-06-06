/*
  Warnings:

  - Changed the type of `tipo_midia` on the `midia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoMidia" AS ENUM ('IMAGEM', 'VIDEO');

-- AlterTable
ALTER TABLE "midia" DROP COLUMN "tipo_midia",
ADD COLUMN     "tipo_midia" "TipoMidia" NOT NULL;
