import { HttpException } from '@nestjs/common';

export class Exception extends HttpException {
  constructor({ code, message }) {
    super(
      {
        code: code,
        message: message,
      },
      400,
    );
  }
}
