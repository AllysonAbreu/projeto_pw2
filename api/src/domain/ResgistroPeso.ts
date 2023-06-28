import { Decimal } from '@prisma/client/runtime';
import { Usuario } from './Usuario';

class RegistroPeso {
  id: number;
  usuario_id: number;
  peso: Decimal;
  data_registro: Date;
  criado_em: Date;
  modificado_em: Date;
  usuario: Usuario;

  constructor(
      id: number,
      usuario_id: number,
      peso: Decimal,
      data_registro: Date,
      criado_em: Date,
      modificado_em: Date,
      usuario: Usuario
  ) {
      this.id = id;
      this.usuario_id = usuario_id;
      this.peso = peso;
      this.data_registro = data_registro;
      this.criado_em = criado_em;
      this.modificado_em = modificado_em;
      this.usuario = usuario;
  }
}
