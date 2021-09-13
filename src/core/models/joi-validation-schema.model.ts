import Joi = require('@hapi/joi');
import { AppResult } from './app-result.model';

export abstract class JoiValidationSchema {
    validate(value: any, schema: Joi.ObjectSchema): Joi.ValidationResult {
        return schema.validate(value, { abortEarly: false });
    }

    transform(value: any, errors: string[], message: string): AppResult {
        const result = new AppResult();
        result.addErrors(errors);
        if (message != null) { result.setMessage(message); }
        return result.response();
    }
}
