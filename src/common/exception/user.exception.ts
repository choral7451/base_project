import { Exception } from '@/common/exception/exception';

export class UserException extends Exception {
  static UserNotFount() {
    return new UserException({
      code: 'USER-001',
      message: '유저가 존재하지 않습니다.',
    });
  }
}
