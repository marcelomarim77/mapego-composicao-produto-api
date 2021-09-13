import { Injectable, NestInterceptor, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Result } from '../models/result-base.model';
import { AppException } from '../exceptions/app.exception';

@Injectable()
export class ResultInterceptor<T> implements NestInterceptor<T, Result<T>> {
    intercept(context: any, next: CallHandler): Observable<Result<T>> {
        context.switchToHttp();
        const now = Date.now();
        const logContext = `ResultInterceptor`;

        if (context.getType() === 'rpc') {
            Logger.log('Processando mensagem...', logContext);
            Logger.debug(JSON.stringify(context.getRequest()), logContext);
        }

        if (context.getType() === 'http') {
            const request: Request = context.getRequest();
            Logger.log(`[${request.method}] ${request.url}`, logContext);
            if (request.method === 'POST' || request.method === 'PUT') {
                Logger.debug(JSON.stringify(request.body), logContext);
            }
        }

        return next
            .handle()
            .pipe(
                catchError((err) => {
                    if (err instanceof AppException) {
                        // tslint:disable-next-line: no-string-literal
                        Logger.warn(err.message, `${logContext}][${err['status']}`);
                    }
                    Logger.log(`#1 Requisição finalizada em ${Date.now() - now}ms.`, logContext);
                    throw err;
                }),
                map((data: Result<T>) => {
                    const ctx = context.switchToHttp();
                    const res = ctx.getResponse();
                    if (data && data.statusCode >= 400) {
                        Logger.warn(data, `${logContext}][${data.statusCode}`);
                    }
                    if (res != null) {
                        res.status(data.statusCode);
                    }
                    Logger.log(`#2 Requisição finalizada em ${Date.now() - now}ms.`, logContext);
                    return data;
                }));
    }
}
