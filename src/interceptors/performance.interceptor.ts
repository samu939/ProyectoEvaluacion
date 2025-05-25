import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          const executionTime = Date.now() - now;
          const handler = context.getHandler();
          const controller = context.getClass().name;
          const methodName = handler.name;
          console.log(`Interceptor: ${controller}.${methodName} executed in ${executionTime}ms`);
        }),
      );
  }
}