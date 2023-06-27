/*
  Warnings:

  - You are about to drop the column `peso_meta` on the `registro_peso` table. All the data in the column will be lost.
  - Added the required column `peso_meta` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registro_peso" DROP COLUMN "peso_meta";

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "peso_meta" DECIMAL(65,30) NOT NULL;
