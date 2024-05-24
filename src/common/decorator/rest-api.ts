import { applyDecorators, Controller, Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { USER_TYPE } from '@/user/entity/user.entity';

interface HttpMethodOption {
  path: string;
  description: string;
  auth?: USER_TYPE[];
}

export function RestApiController(prefix: string, apiTags: string): ClassDecorator {
  return applyDecorators(Controller(prefix), ApiTags(apiTags));
}

export function RestApiGet<T extends new (...args: any[]) => any>(
  okResponseType: T,
  { path, description }: HttpMethodOption,
  exceptions?: Type<any>[],
): MethodDecorator {
  const decorators = [
    Get(path),
    ApiOperation({ summary: description }),
    ApiOkResponse({
      type: okResponseType,
    }),
  ];

  if (exceptions) {
    exceptions.forEach(ExceptionClass => {
      const exceptionInstance = new ExceptionClass();
      decorators.push(
        ApiResponse({
          status: exceptionInstance.getStatus(),
          type: ExceptionClass,
        }),
      );
    });
  }

  return applyDecorators(...decorators);
}

export const Auths = Reflector.createDecorator<string[]>();
export const Roles = Reflector.createDecorator<string[]>();
