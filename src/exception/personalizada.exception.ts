import { HttpException, HttpStatus } from '@nestjs/common';

export class PersonalizadaException extends HttpException {
  constructor() {
    super('Mensagem de Erro Personalizada', HttpStatus.BAD_REQUEST);
  }
}
