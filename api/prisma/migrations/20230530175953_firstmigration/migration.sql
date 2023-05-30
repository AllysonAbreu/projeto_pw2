-- CreateTable
CREATE TABLE "registro_peso" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "peso" DECIMAL(5,2) NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registro_peso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "midia" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "nome_arquivo" TEXT NOT NULL,
    "tipo_midia" TEXT NOT NULL,
    "conteudo" BYTEA NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "midia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "peso" DECIMAL(65,30) NOT NULL,
    "peso_meta" DECIMAL(65,30) NOT NULL,
    "altura" DECIMAL(65,30) NOT NULL,
    "tempo_meta" INTEGER NOT NULL,
    "is_ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokenbl" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokenbl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registro_peso" ADD CONSTRAINT "registro_peso_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "midia" ADD CONSTRAINT "midia_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
