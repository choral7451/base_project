// import { UserService } from './user.service';
import { RestApiController, RestApiGet } from '@/common/decorator/rest-api';
import { UserException } from '@/common/exception/user.exception';

@RestApiController('/users', 'User')
export class UserController {
  // constructor(private readonly appService: UserService) {}

  @RestApiGet(String, { path: '/me', description: '내 정보 조회' })
  getHello(): string {
    throw UserException.UserNotFount();
    // return this.appService.getHello();
  }
}
