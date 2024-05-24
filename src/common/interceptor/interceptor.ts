import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  code: string;
  message: string | null;
  item: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(_: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    return next.handle().pipe(
      map(item => {
        // const response = context.switchToHttp().getResponse();
        const code = 'OK';
        const message = null;

        return {
          code,
          message,
          item,
        };
      }),
    );
  }
}
