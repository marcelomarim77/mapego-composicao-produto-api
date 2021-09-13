import { PipeTransform, Injectable, ArgumentMetadata, Logger } from '@nestjs/common';
import { JoiValidation } from '../interfaces/joi-validation.interface';
import { AppResult } from '../models/app-result.model';
import { AppException } from '../exceptions/app.exception';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema: JoiValidation) { }

    transform(value: any, metadata: ArgumentMetadata) {
        if (this.schema == null) { return value; }

        let response = new AppResult();

        if (value == null) {
            response.addError('Requisição não encontrada para ser validada.');
            throw new AppException(response.response());
        }
        try {
            const { error } = this.schema.validate(value, this.schema.resolveSchema(value));
            if (!error) { return value; }

            const errors: string[] = [];
            // tslint:disable-next-line: no-shadowed-variable
            error.details.forEach((value, index, items) => {
                errors.push(value.message);
            });
            response = this.schema.transform(value, errors, 'Falha ao validar a requisição.');
        } catch (ex) {
            Logger.error(ex.message, ex.stack, 'ERROR');
            response.addError('Houve um erro ao validar a requisição.');
            throw new AppException(response.response());
        }

        throw new AppException(response);
    }
}
