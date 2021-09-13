import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from '../exceptions/app.exception';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        if (host.getType() !== 'http') {
            throw exception;
        }

console.log('AppExceptionFilter');
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response.status(exception.getStatus()).json(exception.getResponse());
    }
}
