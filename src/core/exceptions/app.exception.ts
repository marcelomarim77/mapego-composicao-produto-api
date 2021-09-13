import { HttpException } from '@nestjs/common';
import { AppResult } from '../models/app-result.model';

export class AppException extends HttpException {
    constructor(response: AppResult) {
        super(response, response.getStatusCode());
    }
}
