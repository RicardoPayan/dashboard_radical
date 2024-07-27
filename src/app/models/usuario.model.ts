export class Record {
    constructor(
      public PRIMER_NOMBRE: string,
      public SEGUNDO_NOMBRE: string,
      public APELLIDO_PATERNO: string,
      public APELLIDO_MATERNO: string,
      public FECHA_DE_NACIMIENTO: string,
      public RFC: string,
      public COLONIA_O_POBLACION: string,
      public DELEGACION_O_MUNICIPIO: string,
      public CIUDAD: string,
      public ESTADO: string,
      public CP: string,
      public DIRECCION_CALLE_NUMERO: string,
      public SALDO_ACTUAL: number,
      public LIMITE_DE_CREDITO: number,
      public SALDO_VENCIDO: number
    ) {}
}
  